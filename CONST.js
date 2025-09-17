const MODEL_NAMES = {
  LOG_BOOK_CONTACT: 'LogBookContact',
  LOG_BOOK: 'LogBook',
  USER_PROFILE: 'UserProfile',
};

const TABLE_NAMES = {
  [MODEL_NAMES.LOG_BOOK_CONTACT]: 'LogBookContacts',
  [MODEL_NAMES.LOG_BOOK]: 'LogBooks',
  [MODEL_NAMES.USER_PROFILE]: 'UserProfiles',
}

module.exports = {
  MODEL_NAMES,
  TABLE_NAMES,
};