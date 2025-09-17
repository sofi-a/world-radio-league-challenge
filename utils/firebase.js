const path = require('path');
const os = require('os');
const { Worker } = require('worker_threads');
const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase-service-account.json');

const concurrency = Math.min(os.cpus().length, 4);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

const db = admin.firestore();

function getFirestoreInstance() {
  return db;
}

/**
 * Fetches batches of documents from a Firestore collection using worker threads concurrently.
 * 
 * @generator
 * @param {Object} options - Options for fetching batches.
 * @param {string} options.collectionName - Name of the Firestore collection.
 * @param {number} options.batchSize - Number of documents per batch.
 * @param {number} options.limit - Maximum number of documents to fetch.
 * @param {string} options.orderBy - Field to order documents by.
 * @param {string | undefined} options.orderDirection - Direction to order documents ('asc' or 'desc').
 * @returns {AsyncGenerator<Array<Object>>} Yields batches of documents.
 * @throws {Error} If fetching a batch fails.
 */
async function* fetchBatches(options) {
  const { collectionName, batchSize, limit, orderBy, orderDirection } = options;
  const tasks = Array.from({ length: Math.ceil(limit / batchSize) }, (_, i) => {
    const currentBatchSize = Math.min(batchSize, limit - i * batchSize);
    return {
      collectionName,
      batchSize: currentBatchSize,
      offset: i * batchSize,
      orderBy,
      orderDirection,
    };
  });

  let current = 0;
  let active = 0;
  let resolveNext;
  let rejectNext;
  let nextPromise = new Promise((resolve, reject) => {
    resolveNext = resolve;
    rejectNext = reject;
  });

  function runNext() {
    while (active < concurrency && current < tasks.length) {
      const idx = current++;
      active++;
      startWorker(tasks[idx])
        .then((batch) => {
          active--;
          resolveNext(batch);
          nextPromise = new Promise((resolve, reject) => {
            resolveNext = resolve;
            rejectNext = reject;
          });
          runNext();
        })
        .catch((err) => {
          active--;
          rejectNext(err);
        });
    }
  }

  runNext();

  for (let i = 0; i < tasks.length; i++) {
    yield await nextPromise;
  }
}

/**
 * Starts a worker thread to process Firebase-related tasks asynchronously.
 * 
 * @param {Object} workerData - Options to pass to the worker thread.
 * @param {string} workerData.collectionName - Name of the Firestore collection to process.
 * @param {number} workerData.batchSize - Number of documents to process in each batch.
 * @param {number} workerData.offset - Offset to start processing from.
 * @param {string} workerData.orderBy - Field to order documents by.
 * @param {string | undefined} workerData.orderDirection - Direction to order documents ('asc' or 'desc').
 * @returns {Promise<any>} Resolves with the result data from the worker.
 * @throws {Error} If the worker encounters an error.
 */
function startWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, 'firebaseWorker.js'), {
      workerData,
    });

    worker.on('error', (err) => {
      reject(err);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });

    worker.on('message', (msg) => {
      if (msg.type === 'error') {
        reject(new Error(msg.error));
      } else if (msg.type === 'done') {
        resolve(msg.data);
      }
    });
  });
}

module.exports = { fetchBatches, getFirestoreInstance };
