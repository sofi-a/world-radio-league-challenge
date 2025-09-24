'use strict';

const db = require('../models');
const { getFirestoreInstance } = require('../utils/firebase');
const { fetchBatches } = require('../utils/firebase');
const { MODEL_NAMES, TABLE_NAMES } = require('../CONST');

const COLLECTION_NAME = MODEL_NAMES.USER_PROFILE;
const BATCH_SIZE = 1000;
const LIMIT = 100000;

const firestore = getFirestoreInstance();

function mapBatchToRows(batch) {
  return batch.map((doc) => {
    const createdAt = new Date(doc.createTime._seconds * 1000);
    const updatedAt = new Date(doc.updateTime._seconds * 1000);
    return {
      id: doc.id,
      firstName: doc.firstName,
      lastName: doc.lastName || null,
      bio: doc.bio || null,
      profilePic: doc.profilePic || null,
      callSign: doc.callSign,
      country: doc.country || null,
      city: doc.city || null,
      address: doc.address || null,
      coordinates: doc.coordinates ? JSON.stringify(doc.coordinates) : null,
      gridSquare: doc.gridSquare || null,
      bands: doc.bands ? JSON.stringify(doc.bands) : null,
      modes: doc.modes ? JSON.stringify(doc.modes) : null,
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
    const batchIterator = fetchBatches({
      collectionName: COLLECTION_NAME,
      batchSize: BATCH_SIZE,
      limit,
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
