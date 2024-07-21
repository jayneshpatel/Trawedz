const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');

// Route for user login
router.post('/login', loginControllers.login);

// Route for creating subadmin
router.post('/subAdmin', loginControllers.createSubAdmin);

module.exports = router;

