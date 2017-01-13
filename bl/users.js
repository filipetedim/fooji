'use strict';

// Dependences
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

// Models
const Users = require('../models/users');

/**
 * Registers a user.
 *
 * Validates if all data exists, encrypts the password.
 * Attempts to save the user. If email already exists, mongoose returns an error.
 * After getting an user id, create the token.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the result object
 */
const register = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).send({message: 'Missing params!'});
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    // Crypt the password
    bcrypt.hash(password, null, null, (err, cryptedPassword) => {
        if (err) {
            // TODO rollbar error warning
            return res.status(500).send({message: 'Something went wrong!'});
        }

        const newUser = Users({
            email,
            name,
            password: cryptedPassword
        });

        // Save user, mongoose will send error if trying to register already existing email
        newUser.save((err, user) => {
            if (err) {
                // Duplicate error (existing email)
                if (err.code === 11000) {
                    return res.status(400).send({message: 'Email already exists!'});
                }

                // TODO rollbar error warning
                return res.status(500).send({message: 'Something went wrong!'});
            }

            // Create the token data
            const userObject = user.toObject();
            const tokenData = {
                _id: userObject._id,
                name: userObject.name
            };

            // Create and save token
            user.token = jwt.sign(tokenData, config.SECRET, {
                expiresIn: '1h'
            });
            user.save();

            res.status(201).send({message: 'User created successfully!'});
        });
    });
};

module.exports = {
    register
};