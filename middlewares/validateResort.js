const { body, validationResult } = require('express-validator');
const Resort = require('../models/resort'); 

exports.validateResort = [
  body('name').notEmpty().withMessage('Resort name is required'),
  body('location').notEmpty().withMessage('Resort location is required'),
  body('description').notEmpty().withMessage('Resort description is required'),
  body('facilities').isArray().withMessage('Facilities should be an array'),
  body('category').notEmpty().withMessage('Resort category is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
