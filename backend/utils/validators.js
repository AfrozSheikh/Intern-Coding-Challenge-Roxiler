import { body, param, query } from 'express-validator';

const nameRule = body('name')
  .isString().withMessage('Name is required')
  .isLength({ min: 20, max: 60 }).withMessage('Name must be 20-60 chars');

const addressRuleOptional = body('address')
  .optional()
  .isLength({ max: 400 }).withMessage('Address max 400 chars');

const addressRuleRequired = body('address')
  .isString().withMessage('Address is required')
  .isLength({ max: 400 }).withMessage('Address max 400 chars');

const emailRule = body('email')
  .isEmail().withMessage('Valid email required')
  .normalizeEmail();

const passwordRule = body('password')
  .isLength({ min: 8, max: 16 }).withMessage('Password length 8-16')
  .matches(/[A-Z]/).withMessage('At least one uppercase')
  .matches(/[!@#$%^&*(),.?":{}|<>_\-]/).withMessage('At least one special character');

const ratingValueRule = body('value')
  .isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5');

export const AuthValidators = {
  signup: [nameRule, emailRule, addressRuleRequired, passwordRule],
  login: [emailRule, body('password').isString()]
};

export const AdminValidators = {
  createUser: [nameRule, emailRule, addressRuleRequired, passwordRule, body('role').isIn(['ADMIN','USER','OWNER'])],
  createStore: [body('name').isLength({ min: 1, max: 120 }), body('email').optional().isEmail(), addressRuleRequired, body('ownerId').optional().isInt()]
};

export const RatingValidators = {
  create: [body('storeId').isInt({ min: 1 }), ratingValueRule],
  update: [param('storeId').isInt({ min: 1 }), ratingValueRule]
};

export const UserValidators = {
  changePassword: [passwordRule, body('oldPassword').isString()]
};

export const ListingValidators = {
  // For filters/sorting on list endpoints
  listUsers: [
    query('name').optional().isString(),
    query('email').optional().isString(),
    query('address').optional().isString(),
    query('role').optional().isIn(['ADMIN','USER','OWNER']),
    query('sortBy').optional().isIn(['name','email','address','role','createdAt']),
    query('sortOrder').optional().isIn(['asc','desc']),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
  ],
  listStores: [
    query('name').optional().isString(),
    query('email').optional().isString(),
    query('address').optional().isString(),
    query('sortBy').optional().isIn(['name','email','address','rating','createdAt']),
    query('sortOrder').optional().isIn(['asc','desc']),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('q').optional().isString()
  ]
};
