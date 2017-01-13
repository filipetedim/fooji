'use strict';

// Dependencies
const restful = require('node-restful');
const mongoose = restful.mongoose;

// Schema
const ItemSchema = mongoose.Schema({
    _userId: String,
    content: String,
    listGroup: Number,
    done: {type: Boolean, default: false}
});

/**
 * Creates a virtual property on the user for its created date.
 */
ItemSchema.virtual('created_at').get(() => {
    return this._id.getTimestamp();
});

/**
 * Gets an item by its id.
 *
 * @memberOf Items
 *
 * @param {String} _itemId - the id
 * @param {Function} next - callback
 */
ItemSchema.statics.getById = function (_itemId, next) {
    this.findOne({_id: _itemId}, (err, item) => {
        next(err, item);
    });
};

/** @class Items */
const Items = restful.model('Items', ItemSchema);

module.exports = Items;