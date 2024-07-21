const express = require('express');
const router = express.Router();
const resortController = require('../controllers/resortController');
const { validateResort } = require('../middlewares/validateResort');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/', authenticate, validateResort, resortController.addResort);

module.exports = router;
