const { check, validationResult } = require('express-validator');
exports.create = [
  check('name').notEmpty().withMessage('The name field is required'),
  check('weight').notEmpty().withMessage('The weight field is required'),
  check('address.public_place').notEmpty().withMessage('The public_place field is required'),
  check('address.number').notEmpty().withMessage('The number field is required'),
  check('address.number').isNumeric().withMessage('The number field is not a number'),
  check('address.neighborhood').notEmpty().withMessage('The neighborhood field is required'),
  check('address.city').notEmpty().withMessage('The city field is required'),
  check('address.state').notEmpty().withMessage('The state field is required'),
  check('address.country').notEmpty().withMessage('The country field is required'),
  check('geolocation.latitude').notEmpty().withMessage('The latitude field is required'),
  check('geolocation.longitude').notEmpty().withMessage('The longitude field is required'),
]