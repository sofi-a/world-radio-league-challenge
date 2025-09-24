const MODEL_NAMES = {
  LOG_BOOK_CONTACT: 'LogBookContact',
  LOG_BOOK: 'LogBook',
  USER_PROFILE: 'UserProfile',
};

const TABLE_NAMES = {
  [MODEL_NAMES.LOG_BOOK_CONTACT]: 'LogBookContacts',
  [MODEL_NAMES.LOG_BOOK]: 'LogBooks',
  [MODEL_NAMES.USER_PROFILE]: 'UserProfiles',
};

const REQUEST_PAYLOAD_LOCATION = {
  BODY: 'body',
  QUERY: 'query',
  PARAMS: 'params',
};

const UUID_REGEXP =
  /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
const FIRESTORE_ID_REGEXP = /^(?!__.*__$)(?!^\.$)(?!^\.\.$)[^/]{1,1500}$/;

module.exports = {
  MODEL_NAMES,
  TABLE_NAMES,
  REQUEST_PAYLOAD_LOCATION,
  UUID_REGEXP,
  FIRESTORE_ID_REGEXP,
};
