'use strict';

const db = require('../models');
const { getFirestoreInstance } = require('../utils/firebase');
const { fetchBatches } = require('../utils/firebase');
const { MODEL_NAMES, TABLE_NAMES } = require('../CONST');

const COLLECTION_NAME = MODEL_NAMES.LOG_BOOK;
const BATCH_SIZE = 1000;
const LIMIT = 100000;

const firestore = getFirestoreInstance();

function mapBatchToRows(batch) {
  return batch.map((doc) => {
    const createdAt = new Date(doc.createTime._seconds * 1000);
    const updatedAt = new Date(doc.updateTime._seconds * 1000);
    const timestamp = doc.timestamp ? new Date(doc.timestamp._seconds * 1000) : null;
    return {
      id: doc.id,
      name: doc.name || null,
      defaultCallSign: doc.defaultCallSign || null,
      coordinates: doc.coordinates ? JSON.stringify(doc.coordinates) : null,
      timestamp: timestamp && !isNaN(timestamp.getTime()) ? timestamp : null,
      myAntenna: doc.myAntenna || null,
      myRadio: doc.myRadio || null,
      contactCount: doc.contactCount,
      lastContactTimestamp: doc.lastContactTimestamp ? new Date(doc.lastContactTimestamp._seconds * 1000) : null,
      userId: doc.uid || null,
      createdAt,
      updatedAt,
    };
  });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
        await db[COLLECTION_NAME].bulkCreate(mapBatchToRows(batch), { ignoreDuplicates: true });
      } catch (error) {
        console.error('Error inserting batch:', error.message);
        throw error; 
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAMES[COLLECTION_NAME], null, {});
  }
};
