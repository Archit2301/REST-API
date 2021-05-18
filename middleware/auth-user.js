'use strict';

// Import Modules and Models
const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Create and Export Middleware for Authentication in Routes
exports.authenticateUser = async (req, res, next) => {
  let message;
  const credentials = auth(req);

    if (credentials) {
      const user = await User.findOne({ where: {emailAddress: credentials.name} });
      if (user) {
        const authenticated = bcrypt.compareSync(credentials.pass, user.password);
        if (authenticated) {
          console.log(`Authentication successful for user: ${user.firstName} ${user.lastName}`);
          req.currentUser = user;
        } else {
          message = `Authentication failed for user: ${user.firstName} ${user.lastName}`;
        }
      } else {
        message = `User Not Found for username: ${credentials.name}`;
      }
    } else {
      message = 'Authentication Header Not Found';
    }
    if (message) {
      console.warn(message);
      res.status(401)
        .json({ message: 'Access Denied' });
    } else {
      next();
    }
};