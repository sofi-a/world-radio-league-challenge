const createError = require('http-errors');
const { status: httpStatus } = require('http-status');
const express = require('express');
const { id, validateRequest } = require('../validators');
const db = require('../models');
const { MODEL_NAMES } = require('../CONST');

const router = express.Router();

/* GET users listing. */
router.get('/:id', id(), validateRequest, async function (req, res, next) {
  try {
    const userProfile = await db[MODEL_NAMES.USER_PROFILE].findByUserId(
      req.params.id
    );
    if (!userProfile) {
      throw createError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.json(userProfile);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
