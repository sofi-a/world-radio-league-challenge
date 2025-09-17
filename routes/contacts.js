const createError = require('http-errors');
const { status: httpStatus } = require('http-status');
const express = require('express');
const { id, validateRequest, searchTerm, page, pageSize, sortBy, sortOrder } = require('../validators');
const db = require('../models');
const { MODEL_NAMES, REQUEST_PAYLOAD_LOCATION } = require('../CONST');

const router = express.Router();

/* GET logbooks listing. */
router.get(
  '/:userId',
  [
    id(REQUEST_PAYLOAD_LOCATION.PARAMS, 'userId'),
    searchTerm,
    page,
    pageSize,
    sortBy,
    sortOrder,
  ],
  validateRequest,
  async function(req, res, next) {
    try {
      const { searchTerm, page, pageSize, sortBy, sortOrder } = req.query;
      console.log(pageSize)
      const userProfile = await db[MODEL_NAMES.USER_PROFILE].findByUserId(req.params.userId);
      if (!userProfile) {
        throw createError(httpStatus.NOT_FOUND, 'User not found');
      }
      const contacts = await db[MODEL_NAMES.LOG_BOOK_CONTACT].findContactsByUserId({
        userId: userProfile.id,
        searchTerm,
        page,
        pageSize,
        sortBy,
        sortOrder,
      });
      if (!contacts || contacts.length === 0) {
        throw createError(httpStatus.NOT_FOUND, 'No contacts found for this user');
      }
      res.json(contacts);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
