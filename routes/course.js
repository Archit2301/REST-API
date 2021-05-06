'use strict';

const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { Course } = require('../models');
const { authenticateUser } = require('../middleware/auth-user')

// Create a router instance
const router = express.Router();

module.exports = router;