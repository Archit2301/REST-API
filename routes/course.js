'use strict';

const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { User, Course } = require('../models');
const { authenticateUser } = require('../middleware/auth-user')

// Create a router instance
const router = express.Router();

// GET /api/courses route to return the list of courses
router.get('/courses', asyncHandler (async (req, res) => {
  const courses = await Course.findAll({
    include: [{
      model: User,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password']  
      }  
    }],
    attributes: {
      exclude: ['createdAt', 'updatedAt']  
    }  
  });
  res.json(courses).status(200).end();
}));

// GET /api/courses/:id route to return an individual course
router.get('/courses/:id', asyncHandler (async (req, res) => {
  const courses = await Course.findAll({
      where: {
        id: req.params.id  
      },
      include: [{
        model: User,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password']  
        }  
      }],
      attributes: {
        exclude: ['createdAt', 'updatedAt']  
      }  
    });
  res.json(courses).status(200).end();
}));

// POST /api/courses route to create a new course
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
  let course;  
  try {
    course = await Course.create(req.body);
    res.status(201).location(`/courses/${course.id}`).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;  
    }
  }  
}));

// PUT /api/courses/:id route to update a corresponding course
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  let course;
  try {
    const user = req.currentUser;
    course = await Course.findByPk(req.params.id);
    if (course) {
      if (course.userId === user.id) {
        await course.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).json({ message: 'Access is forbidden' }).end();
      }  
    } else {
      res.status(404).json({ messsage: 'Course Not Found' });  
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;  
    }  
  }  
}));

// DELETE /api/courses/:id route to delete a corresponding course
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    let course;
    try {
      const user = req.currentUser;
      course = await Course.findByPk(req.params.id);
      if (course) {
        if (course.userId === user.id) {
          await course.destroy();
          res.status(204).end();
        } else {
          res.status(403).json({ message: 'Access is forbidden' });
        }  
      } else {
        res.status(404).json({ messsage: 'Course Not Found' });  
      }
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;  
      }  
    }  
  }));

module.exports = router;