'use strict';

// Dependencies
const express = require('express');

// Init
const router = express.Router();

// Routes
const Users = require('./users');
const Items = require('./items');

// Registrations
Users.register(router, '/users');
Items.register(router, '/items');

// Export router
module.exports = router;