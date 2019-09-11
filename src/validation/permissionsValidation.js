import { validationResult } from 'express-validator';
import models from '../models';
import errorAssignment from '../utils/errorAssignment';

const { roles } = models;

const validateRole = async (request) => {
  let errors = {};
  const { role } = request.body;
  if (!role) errors = { ...errorAssignment('Role input is compulsory', 'role') };
  if (!/^\d+$/.test(role)) errors = { ...errorAssignment('Role input must be a number', 'role') };

  if (!errors.role && role) {
    const userRole = await roles.findOne({
      where: { id: role },
      raw: true
    });
    if (!userRole) {
      errors = { ...errorAssignment('Role is invalid', 'role') };
    } else {
      request.userRole = userRole.id;
    }
  }
  return errors;
};
const validatePermissionField = async (request) => {
  let errors = {};
  let { addPermission, removePermission } = request.body;
  addPermission = addPermission ? addPermission.trim() : null;
  removePermission = removePermission ? removePermission.trim() : null;

  // eslint-disable-next-line
  if (!request.body.hasOwnProperty('addPermission')&&!request.body.hasOwnProperty('removePermission')) errors = { ...errorAssignment('Permission field accepts keys \'addPermission\' OR \'removePermission\'', 'permission') };

  if (!/^\S{8,}$/i.test(removePermission || addPermission)) errors = { ...errorAssignment('Permission value is compulsory, must be atleast 8 characters with no spaces allowed', 'permission') };
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
const validatePermissionInput = async (req, res, next) => {
  const errors = validationResult(req);
  const validateRoleError = await validateRole(req);
  const validatePermissionError = await validatePermissionField(req);
  const validateRoleErrorKeys = Object.keys(validateRoleError);
  const validatePermissionErrorKeys = Object.keys(validatePermissionError);
  if (!errors.isEmpty() || validateRoleErrorKeys.length || validatePermissionErrorKeys.length) {
    const errorObj = { ...validateRoleError, ...validatePermissionError };
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

export default validatePermissionInput;
