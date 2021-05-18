'use strict';

const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { User } = require('../models');
const { authenticateUser } = require('../middleware/auth-user')

// Create a router instance
const router = express.Router();

// GET /api/users Route that returns authenticated user
router.get('/users', authenticateUser, asyncHandler( async (req, res) => {
  const user = req.currentUser;
  //console.log(user);

  res.json({    
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddress,
  });
}));

// POST /api/users Route to create a new user
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).location('/').end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;  
    }
  }  
}));

module.exports = router;