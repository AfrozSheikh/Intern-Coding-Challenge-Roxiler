const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const userValidationRules = () => {
  return [
    body('name').isLength({ min: 20, max: 60 }).withMessage('Name must be between 20 and 60 characters'),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password').isLength({ min: 8, max: 16 }).withMessage('Password must be 8-16 characters')
      .matches(/^(?=.*[A-Z])(?=.*[!@#$&*]).*$/).withMessage('Password needs one uppercase letter and one special character'),
    body('address').isLength({ max: 400 }).withMessage('Address cannot exceed 400 characters').optional(),
    body('role').isIn(['admin', 'user', 'store_owner']).withMessage('Invalid role specified'),
  ];
};

const storeValidationRules = () => {
    return [
      body('name').notEmpty().withMessage('Store name is required'),
      body('email').isEmail().withMessage('Must be a valid email for the store'),
      body('address').isLength({ max: 400 }).withMessage('Address cannot exceed 400 characters'),
    ];
};

module.exports = {
  userValidationRules,
  storeValidationRules,
  handleValidationErrors,
};