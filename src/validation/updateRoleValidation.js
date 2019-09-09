import { body, validationResult } from 'express-validator';
import models from '../models';
import errorAssignment from '../utils/errorAssignment';

const { Users, roles } = models;

const roleCheck = [
  body('email').trim().not().isEmpty()
    .withMessage('Email field is required')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid Email'),
  body('newRole').trim().not().isEmpty()
    .withMessage('Role field is required')
];

const validateEmail = async (request) => {
  let errors = {};
  const { email } = request.body;
  if (!/@andela.com$/.test(email)) errors = { ...errorAssignment('email must be an andela email', 'email') };

  if (!errors.email && email) {
    const userData = await Users.findOne({
      where: { email },
      raw: true
    });
    if (!userData) {
      errors = { ...errorAssignment('Check email and try again', 'email') };
    } else {
      request.staffId = userData.userId;
      request.staffOldRole = userData.role;
    }
  }
  return errors;
};
const validateRole = async (request) => {
  let errors = {};
  const { newRole } = request.body;
  if (!/^\d+$/.test(newRole))errors = { ...errorAssignment('Role field must be a number', 'newRole') };
  if (!errors.newRole && newRole) {
    const userRole = await roles.findOne({
      where: { id: newRole },
      raw: true
    });
    if (!userRole) {
      errors = { ...errorAssignment('Check role input and try again', 'newRole') };
    } else {
      request.userRole = userRole.id;
    }
  }
  return errors;
};

/**
 *@description Validates all the inputs
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Function} next
 * @memberof Validation
 */
const validateRoleInput = async (req, res, next) => {
  const errors = validationResult(req);
  const validateEmailError = await validateEmail(req);
  const validateRoleError = await validateRole(req);
  const validateEmailErrorKeys = Object.keys(validateEmailError);
  const validateRoleErrorKeys = Object.keys(validateRoleError);
  if (!errors.isEmpty() || validateEmailErrorKeys.length || validateRoleErrorKeys.length) {
    const errorObj = { ...validateEmailError, ...validateRoleError };
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

export { roleCheck, validateRoleInput };
