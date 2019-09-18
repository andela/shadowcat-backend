import { body, validationResult } from 'express-validator';

const createRoleCheck = [
  body('name').trim().isLength({ min: 5 })
    .withMessage('Name of role must be at least 5 characters long')
    .matches(/^[A-z0-9_]+$/, 'i')
    .withMessage('no spaces are allowed, \'_\' is the only allowed special character'),
  body('permissions').trim().matches(/^\S{8,}$/, 'i')
    .withMessage('permission field must be at least 8 charcters long with no spaces are allowed')
];
const addUserCheck = [
  body('firstname').trim().isLength({ min: 3 })
    .withMessage('firstname must be at least 3 characters long')
    .isAlpha()
    .withMessage('firstname field must only be alphabets'),
  body('lastname').trim().isLength({ min: 3 })
    .withMessage('lastname must be at least 3 characters long')
    .isAlpha()
    .withMessage('lastname field must only be alphabets'),
  body('email').trim().not().isEmpty()
    .withMessage('Email field is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'),
  body('defaultPassword').trim().isLength({ min: 8 })
    .withMessage('defaultPassword must be at least 8 characters long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
    .withMessage('Password must be a combination one lowercase, one uppercase, a number, a special character')
];

/**
 *@description Validates all the inputs
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Function} next
 * @memberof Validation
 */
const validateCreateRoleInput = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = { };
    errors.array().map(err => {
      if (errorObj[err.param]) return errorObj[err.param].push(err.msg);
      errorObj[err.param] = [err.msg];
      return errorObj;
    });
    return res.status(400).json({
      status: 'error',
      error: errorObj
    });
  }
  return next();
};

export { createRoleCheck, addUserCheck, validateCreateRoleInput };
