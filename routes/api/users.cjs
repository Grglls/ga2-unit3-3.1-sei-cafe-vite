const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users.cjs');
const ensureLoggedIn = require('../../config/ensureLoggedIn.cjs');

// All routes start with /api/users

// GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

// POST /api/users
router.post('/', usersCtrl.create);

// POST /api/users/login
router.post('/login', usersCtrl.login);

module.exports = router;