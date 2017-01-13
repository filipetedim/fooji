'use strict';

// Dependencies
const express = require('express');

// Models
const Users = require('../models/users');

// BusinessLogic
const UsersBL = require('../bl/users');

// Endpoints
Users.methods([]);

// Routes
Users.route('register', ['post'], UsersBL.register);

module.exports = Users;