const { check } = require('express-validator');
exports.create = [
  check('name').notEmpty().withMessage('The name field is required'),
  check('weight').notEmpty().withMessage('The weight field is required'),
  check('address').notEmpty().withMessage('The address field is required'),
  
]