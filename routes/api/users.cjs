const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users.cjs');

// POST /api/users
router.post('/', usersCtrl.create);

module.exports = router;