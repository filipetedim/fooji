'use strict';

// Dependencies
const express = require('express');

// Models
const Users = require('../models/users');

// BusinessLogic
const UsersBL = require('../bl/users');

// Endpoints
Users.methods(['get']); // added openning for exercise testing porpuses 

// Routes
Users.route('register', ['post'], UsersBL.register);

module.exports = Users;
