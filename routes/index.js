// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/movieControllers');

// Get all records
router.get('/users', userController.getAllUsers);

// Get by ID (must come BEFORE dynamic routes)
router.get('/users/:id', userController.getUserById);

// Search by genre (avoid conflict with :id)
router.get('/users/genre/:genre', userController.getUserByGender);

// Create new record
router.post('/users', userController.createUser);

// Update by ID
router.put('/users/:id', userController.updateUser);

// Delete by ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;