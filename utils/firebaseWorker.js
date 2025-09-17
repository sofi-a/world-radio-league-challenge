const { workerData, parentPort } = require('worker_threads')
const { getFirestoreInstance } = require('./firebase');

const db = getFirestoreInstance();

async function fetchBatch() {
  const { collectionName, batchSize, offset, orderBy, orderDirection } = workerData;
  const collectionRef = db.collection(collectionName);
  const query = orderBy ? collectionRef.orderBy(orderBy, orderDirection || 'asc') : collectionRef;
  const snapshot = await query.offset(offset).limit(batchSize).get();
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, createTime: doc.createTime, updateTime: doc.updateTime }));
}

fetchBatch()
  .then((docs) => parentPort.postMessage({ type: 'done', data: docs }))
  .catch((err) => parentPort.postMessage({ type: 'error', error: err.message }));