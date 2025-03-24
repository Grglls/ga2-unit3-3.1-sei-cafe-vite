const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// Require and configure the dotenv module:
require('dotenv').config();

// Connect to the database:
require('./config/database.cjs');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'dist' folder
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to verify token and assin user object of payload to req.user:
// (Be sure to mount before routes!)
app.use(require('./config/checkToken.cjs'));

// Configure to use port 3002 instead of 3000 during development
const port = process.env.PORT || 3002;

// Put API routes here, before the "catch all" route:
app.use('/api/users', require('./routes/api/users.cjs'));

// Protect all routes below from anonymous users:
const ensureLoggedIn = require('./config/ensureLoggedIn.cjs');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items.cjs'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests.
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});
