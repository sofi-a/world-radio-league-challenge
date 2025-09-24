'use strict';

const db = require('../models');
const { getFirestoreInstance } = require('../utils/firebase');
const { fetchBatches } = require('../utils/firebase');
const { isValidDate, isValidTime } = require('../utils/date');
const { MODEL_NAMES, TABLE_NAMES } = require('../CONST');

const COLLECTION_NAME = MODEL_NAMES.LOG_BOOK_CONTACT;
const BATCH_SIZE = 1000;
const LIMIT = 100000;

const firestore = getFirestoreInstance();

function mapBatchToRows(batch) {
  return batch.map((doc) => {
    const createdAt = new Date(doc.createTime._seconds * 1000);
    const updatedAt = new Date(doc.updateTime._seconds * 1000);
    return {
      id: doc.id,
      date: isValidDate(doc.date)
        ? doc.date
        : createdAt.toISOString().substring(0, 10),
      time: isValidTime(doc.time)
        ? doc.time
        : createdAt.toTimeString().split(' ')[0],
      frequency: doc.frequency ? parseFloat(doc.frequency) : null,
      mode: doc.userMode || '',
      band: doc.band || '',
      grid: doc.grid || null,
      distance: doc.distance ? parseFloat(doc.distance) || null : null,
      rstSent: doc.rstSent ? parseInt(doc.rstSent) || null : null,
      rstReceived: doc.rstRCVD ? parseInt(doc.rstRCVD) || null : null,
      notes: doc.notes || null,
      myName: doc.myName || null,
      theirName: doc.theirName || null,
      myProfilePic: doc.myProfilePic || null,
      theirProfilePic: doc.theirProfilePic || null,
      myCallSign: doc.myCallSign || null,
      theirCallSign: doc.theirCallsign || null,
      myCoordinates: doc.myCoordinates
        ? JSON.stringify(doc.myCoordinates)
        : null,
      theirCoordinates: doc.theirCoordinates
        ? JSON.stringify(doc.theirCoordinates)
        : null,
      myCountry: doc.myCountry || null,
      theirCountry: doc.theirCountry || null,
      myCity: doc.myCity || null,
      theirCity: doc.theirCity || null,
      myState: doc.myState || null,
      theirState: doc.theirState || null,
      myAntenna: doc.myAntenna || null,
      myRadio: doc.myRadio || null,
      userId: doc.uid || null,
      logBookId: doc.logBookId || null,
      createdAt,
      updatedAt,
    };
  });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    const snapshot = await firestore.collection(COLLECTION_NAME).count().get();
    const limit = Math.min(snapshot.data().count, LIMIT);
    const orderBy = 'contactTimeStamp';
    const orderDirection = 'desc';
    const batchIterator = fetchBatches({
      collectionName: COLLECTION_NAME,
      batchSize: BATCH_SIZE,
      limit,
      orderBy,
      orderDirection,
    });
    while (true) {
      const { value: batch, done } = await batchIterator.next();
      if (done || !batch || batch.length === 0) break;

      try {
        await db[COLLECTION_NAME].bulkCreate(mapBatchToRows(batch), {
          ignoreDuplicates: true,
        });
      } catch (error) {
        console.error('Error inserting batch:', error.message);
        throw error;
      }
    }
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAMES[COLLECTION_NAME], null, {});
  },
};
