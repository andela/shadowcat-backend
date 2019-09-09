import models from '../models';
import response from '../utils/Response';

const { serverResponse } = response;

const { Users, roles } = models;

/**
 * @class CheckStatus
 */
class RoleStatus {
  /**
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Integer} userRole
 * @memberof RoleStatus
 */ // eslint-disable-next-line
  static getPermission(permission) {
    return async (req, res, next) => {
      const { id } = req;
      const userData = await Users.findOne({
        where: { userId: id },
        raw: true
      });
      if (!userData) return serverResponse(res, 400, ...['error', 'message', 'User does not exist']);
      const { role } = userData;
      const roleData = await roles.findOne({
        where: { id: role },
        raw: true
      });
      if (!roleData) return serverResponse(res, 400, ...['error', 'message', 'Unauthorized']);
      const { rolePermissions } = roleData;
      const checkPermission = rolePermissions.includes(permission);
      if (!checkPermission) return serverResponse(res, 400, ...['error', 'message', 'You do not have authorization rights']);
      return next();
    };
  }
}

export default RoleStatus;
