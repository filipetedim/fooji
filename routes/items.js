'use strict';

// Dependencies
const express = require('express');

// Models
const Items = require('../models/items');

// BusinessLogic
const ItemsBL = require('../bl/items');

// Middlewares
const AuthTokens = require('../middlewares/auth/authToken');
const AuthItems = require('../middlewares/auth/authItems');

// Endpoints
Items.methods(['get', 'put', 'post', 'delete']);
Items
    .before('get', [AuthTokens.checkToken, AuthItems.checkAccessToItem])
    .before('put', [AuthTokens.checkToken, AuthItems.checkAccessToItem])
    .before('post', [AuthTokens.checkToken, ItemsBL.create])
    .before('delete', [AuthTokens.checkToken, AuthItems.checkAccessToItem]);
Items
    .after('get', [AuthItems.removeItemsDenied]);

module.exports = Items;