const createError = require('http-errors');
const { status: httpStatus } = require('http-status');
const express = require('express');
const {
  id,
  validateRequest,
  searchTerm,
  page,
  pageSize,
  sortBy,
  sortOrder,
} = require('../validators');
const db = require('../models');
const { MODEL_NAMES, REQUEST_PAYLOAD_LOCATION } = require('../CONST');

const router = express.Router();

const getContactsValidators = [searchTerm, page, pageSize, sortBy, sortOrder];

/* GET contacts listing. */
router.get(
  '/',
  getContactsValidators,
  validateRequest,
  async function(req, res, next) {
    try {
      const { searchTerm, page, pageSize, sortBy, sortOrder } = req.query;
      const { count: total, rows: contacts } = await db[
        MODEL_NAMES.LOG_BOOK_CONTACT
      ].findContacts({
        searchTerm,
        page,
        pageSize,
        sortBy,
        sortOrder,
      });
      res.json({ total, contacts });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:userId',
  getContactsValidators.concat(id(REQUEST_PAYLOAD_LOCATION.PARAMS, 'userId')),
  validateRequest,
  async function(req, res, next) {
    try {
      const { searchTerm, page, pageSize, sortBy, sortOrder } = req.query;
      const userProfile = await db[MODEL_NAMES.USER_PROFILE].findByUserId(
        req.params.userId
      );
      if (!userProfile) {
        throw createError(httpStatus.NOT_FOUND, 'User not found');
      }
      const { count: total, rows: contacts } = await db[
        MODEL_NAMES.LOG_BOOK_CONTACT
      ].findContacts({
        userId: userProfile.id,
        searchTerm,
        page,
        pageSize,
        sortBy,
        sortOrder,
      });
      if (!contacts || contacts.length === 0) {
        throw createError(
          httpStatus.NOT_FOUND,
          'No contacts found for this user'
        );
      }
      res.json({ total, contacts });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
