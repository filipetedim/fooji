'use strict';

/**
 * Returns true if the object isn't null or undefined.
 *
 * @param {Object} obj - the object to check
 * @return {Boolean} - true if exists, false if not
 */
const exists = obj => obj !== null && obj !== undefined && obj !== 'null' && obj !== 'undefined';

module.exports = {
    exists
};