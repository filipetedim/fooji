'use strict';

// Dependences
const jwt = require('jsonwebtoken');
const config = require('../../config');

// Models
const Users = require('../../models/users');

// Middlewares
const Utils = require('../utils');

/**
 * Checks if a token exists and is valid.
 * 
 * @param {Object} req - the request object
 * @param {Object} res - the result object
 * @param {Function} next - the callback
 */
const checkToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (!Utils.exists(token)) {
        return res.status(403).send({message: 'No token provided'});
    }

    // Validate token
    jwt.verify(token, config.SECRET, (err, decoded) => {
        if (err) {
            // TODO rollbar error warning
            return res.status(500).send({message: 'Something went wrong!'});
        }

        Users.findOne({_id: decoded._id, token: token}, (err, user) => {
            if (err) {
                // TODO rollbar error warning
                return res.status(500).send({message: 'Something went wrong!'});
            }

            // Sometimes it came in different states, not 100% sure this is the best way to do it though
            if (user !== null) {
                req.decoded = decoded;
                return next();
            }

            // TODO rollbar token without id warning
            res.send(401).send({message: 'Failed to authenticate token!'});
        });
    });
};

module.exports = {
    checkToken
};