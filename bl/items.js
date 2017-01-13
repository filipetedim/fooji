'use strict';

/**
 * Before creating the item, adds the user id to it through the token.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the result object
 * @param {Function} next - the callback
 */
const create = (req, res, next) => {
    if (!req.body.content) {
        return res.status(400).send({message: 'Missing params!'});
    }
    
    req.body._userId = req.decoded._id;

    next();
};

module.exports = {
    create
};