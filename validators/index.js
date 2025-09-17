const createError = require('http-errors');
const { status: httpStatus } = require('http-status');
const { body, query, param, oneOf, validationResult } = require('express-validator');
const { FIRESTORE_ID_REGEXP, REQUEST_PAYLOAD_LOCATION, UUID_REGEXP } = require('../CONST');

function getValidator(location) {
  switch (location) {
    case REQUEST_PAYLOAD_LOCATION.PARAMS:
      return param;
    case REQUEST_PAYLOAD_LOCATION.QUERY:
      return query;
    case REQUEST_PAYLOAD_LOCATION.BODY:
    default:
      return body;
  }
}

function id(location = 'params', field = 'id') {
  const validator = getValidator(location);
  return oneOf([
    validator(field).matches(FIRESTORE_ID_REGEXP),
    validator(field).matches(UUID_REGEXP)
  ]);
} 

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createError(httpStatus.BAD_REQUEST, { errors: errors.array() });
  }
  next();
}

module.exports = {
  id,
  validateRequest
}