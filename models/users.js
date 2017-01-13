'use strict';

// Dependencies
const restful = require('node-restful');
const mongoose = restful.mongoose;

// Schema
const UserSchema = mongoose.Schema({
    email: {type: String, required: true, lowercase: true, trim: true, unique: true},
    name: String,
    password: String,
    token: String
});

/**
 * Creates a virtual property on the user for its created date.
 */
UserSchema.virtual('created_at').get(() => {
    return this._id.getTimestamp();
});

/** @class Users */
const Users = restful.model('Users', UserSchema);

module.exports = Users;