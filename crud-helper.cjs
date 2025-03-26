// Connect to the database
require('dotenv').config();
require('./config/database.cjs');

// Require the Mongoose models
const User = require('./models/user.cjs');
const Item = require('./models/item.cjs');
const Category = require('./models/category.cjs');
const Order = require('./models/order');

// Local variables will come in handy for holding retrieved documents
let user, item, category, order;
let users, items, categories, orders;