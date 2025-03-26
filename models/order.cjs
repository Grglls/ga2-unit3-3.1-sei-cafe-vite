const mongoose = require('mongoose');
const itemSchema = require('./itemSchema.cjs');
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
  qty: { type: Number, default: 1 },
  item: itemSchema
});

const orderSchema = new Schema({
  // An order belongs to a user:
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // Makes sense to embed an order's line items:
  lineItems: [lineItemSchema],
  // A user's unpaid order is their 'cart':
  isPaid: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
