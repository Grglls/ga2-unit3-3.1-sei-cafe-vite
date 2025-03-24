const mongoose = require('mongoose');
// Ensure the Category model is processed by Mongoose
//  (for populating Menu Item queries).
// Categories are only seeded external to the application,
//  therefore category model is never actually 'required', however
//  we do want it to be loaded so that we can populate the category
//  on our items.
require('./category.cjs');
const itemSchema = require('./itemSchema.cjs');

module.exports = mongoose.model('Item', itemSchema);