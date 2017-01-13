'use strict';

// Dependencies
const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Init
const server = express();
mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnectionUrl());

// Middlewares
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(bodyParser.json({limit: '50mb'}));

// Routes
server.use('/v1', require('./routes/v1'));

// Run
server.listen(config.PORT);

console.log(`Server started on port ${config.PORT}`);