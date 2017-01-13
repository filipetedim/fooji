'use strict';

const config = require('./config');
const database = require('./database');

/**
 * Creates and returns the connection url to the database at mlab.com.
 * 
 * @return {String} - db url
 */
const getDbConnectionUrl = () => `mongodb://${database.USERNAME}:${database.PASSWORD}@${database.URL}`;

module.exports = {
    getDbConnectionUrl,
    PORT: config.PORT,
    SECRET: config.SECRET
};