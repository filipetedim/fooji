'use strict';

// Models
const Items = require('../../models/items');

/**
 * Checks if a user has access to a given item.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the result object
 * @param {Function} next - the callback
 */
const checkAccessToItem = (req, res, next) => {
    const token = req.decoded;
    const _itemId = req.params.id || req.query._itemId || req.body.itemId;
    
    // If the item id exists, validate user id, otherwise, retrieve all items of this user
    if (req.url.split('/')[2]) {
        if (!_itemId) {
            return res.status(400).send({message: 'Missing params!'});
        }
        
        Items.getById(_itemId, (err, item) => {
            if (err) {
                // TODO rollbar error warning
                return res.status(500).send({message: 'Something went wrong!'});
            }

            if (!item) {
                return res.status(404).send({message: 'Item not found!'});
            }

            // Check if user ids match, use toString because mongoose likes to wtf sometimes
            if (item._userId.toString() !== token._id.toString()) {
                return res.status(401).send({message: 'Access denied!'});
            }

            next();
        });
    } else {
        next();
    }
};

/**
 * Goes through all the fetched items and removes the ones where the user id in the token doesn't match.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the result object
 * @param {Function} next - the callback
 */
const removeItemsDenied = (req, res, next) => {
    if (!req.url.split('/')[2] && res && res.locals && res.locals.bundle) {
        res.locals.bundle = res.locals.bundle.reduce((prev, item) => {
            if (item._userId.toString() === req.decoded._id.toString()) {
                prev.push(item);
            }
            return prev;
        }, []);
    }

    next();
};

module.exports = {
    checkAccessToItem,
    removeItemsDenied
};