const mongoose = require('mongoose');
const itemSchema = require('./itemSchema.cjs');
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
  qty: { type: Number, default: 1 },
  item: itemSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

lineItemSchema.virtual('extPrice').get(function() {
  // 'this' keyword is bound to the lineItem document.
  return this.qty * this.item.price;
});

const orderSchema = new Schema({
  // An order belongs to a user:
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // Makes sense to embed an order's line items:
  lineItems: [lineItemSchema],
  // A user's unpaid order is their 'cart':
  isPaid: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

orderSchema.virtual('orderTotal').get(function() {
  return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual('totalQty').get(function() {
  return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

orderSchema.virtual('orderId').get(function() {
  // Note: use .id to return a string instead of ._id which returns an Object Id,
  //  this allows use to use the string methods such as slice().
  // Use negative index to get the last 6 characters of the id:
  return this.id.slice(-6).toUpperCase();
});

// Statics are callable on the model, not an instance (document).
orderSchema.statics.getCart = function(userId) {
  // 'this' is bound to the model (don't use an arrow function).
  // Return the promise that resolves to a cart (the user's unpaid order):
  return this.findOneAndUpdate(
    // The query object:
    { user: userId, isPaid: false },
    // The update document - provided values when inserting:
    { user: userId },
    // The options object:
    //  - Upsert option creates the doc if it doesn't exist.
    //  - new: true option makes mongoose return the document AFTER the update was applied.
    { upsert: true, new: true }
    // Note: 'upserting' in database lingo means to insert (create) a record/document
    //  if it doesn't exist and update it when it does.
  );
};

module.exports = mongoose.model('Order', orderSchema);
