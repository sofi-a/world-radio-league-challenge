const createError = require('http-errors');
const { status: httpStatus } = require('http-status');
const {
  body,
  query,
  param,
  oneOf,
  validationResult,
} = require('express-validator');
const {
  FIRESTORE_ID_REGEXP,
  REQUEST_PAYLOAD_LOCATION,
  UUID_REGEXP,
} = require('../CONST');

const searchTerm = param('searchTerm')
  .optional()
  .isString()
  .isLength({ min: 1, max: 255 });
const page = query('page').optional().isInt({ min: 1 }).toInt();
const pageSize = query('pageSize')
  .optional()
  .isInt({ min: 1, max: 100 })
  .toInt();
const sortBy = query('sortBy')
  .optional()
  .isIn([
    'date',
    'myName',
    'theirName',
    'myCallSign',
    'theirCallSign',
    'frequency',
    'mode',
    'band',
    'distance',
    'rstSent',
    'rstReceived',
    'createdAt',
  ]);
const sortOrder = query('sortOrder').optional().isIn(['ASC', 'DESC']);

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
    validator(field).matches(UUID_REGEXP),
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
  searchTerm,
  page,
  pageSize,
  sortBy,
  sortOrder,
  id,
  validateRequest,
};
