const createError = require('http-errors');
const { status: httpStatus } = require('http-status');
const express = require('express');
const { id, validateRequest } = require('../validators');
const db = require('../models');
const { MODEL_NAMES, REQUEST_PAYLOAD_LOCATION } = require('../CONST');

const router = express.Router();

/* GET logbooks listing. */
router.get(
  '/:userId',
  id(REQUEST_PAYLOAD_LOCATION.PARAMS, 'userId'),
  validateRequest,
  async function(req, res, next) {
    try {
      const userProfile = await db[MODEL_NAMES.USER_PROFILE].findByUserId(req.params.userId);
      if (!userProfile) {
        throw createError(httpStatus.NOT_FOUND, 'User not found');
      }
      const logBooks = await db[MODEL_NAMES.LOG_BOOK].findLogBooksByUserId(userProfile.id);
      if (!logBooks || logBooks.length === 0) {
        throw createError(httpStatus.NOT_FOUND, 'No log books found for this user');
      }
      res.json(logBooks);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
