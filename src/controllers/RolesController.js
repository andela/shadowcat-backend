import uuidv4 from 'uuid/v4';
import bcrypt from 'bcryptjs';
import models from '../models';
import response from '../utils/Response';

const { serverResponse } = response;

const { Users, roles } = models;


/**
 *@description A class that handles roles assignment within the application
 * @class Roles
 */
class Roles {
  /**
 *@description A class method that assigns roles to users by a superadmin;
 *@static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object} A response object
 * @memberof Roles
 */
  static async createRole(req, res, next) {
    try {
      let { name } = req.body;
      const { permissions } = req.body;
      name = name.toLowerCase();
      const checkRole = await roles.findOne({
        attributes: ['id', 'roleName'],
        where: { roleName: name },
        raw: true
      });
      if (checkRole) return serverResponse(res, 400, ...['error', 'message', 'Role already exist']);
      const roleData = await roles.create({ roleName: name, rolePermissions: [permissions] });
      if (!roleData) return serverResponse(res, 400, ...['error', 'message', 'Check the input data and try again']);

      const responseObj = {
        name: roleData.roleName, id: roleData.id, createdAt: roleData.createdAt
      };
      return serverResponse(res, 201, ...['success', 'data', responseObj]);
    } catch (err) {
      return next(err);
    }
  }

  /**
 *@description A class method that assigns roles to users by a superadmin;
 *@static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object} A response object
 * @memberof Roles
 */
  static async addNewUser(req, res, next) {
    try {
      const {
        firstname, lastname, email, defaultPassword
      } = req.body;
      const checkUser = await Users.findOne({
        where: { email },
        raw: true
      });
      if (checkUser) return serverResponse(res, 400, ...['error', 'message', 'User already exist']);
      const userData = await Users.create({
        firstname, lastname, email, userId: uuidv4(), password: bcrypt.hashSync(defaultPassword, 10)
      });
      if (!userData) return serverResponse(res, 400, ...['error', 'message', 'Check the input data and try again']);

      const responseObj = {
        userId: userData.userId,
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        createdAt: userData.createdAt
      };
      return serverResponse(res, 201, ...['success', 'data', responseObj]);
    } catch (err) {
      return next(err);
    }
  }

  /**
 *@description A class method that assigns roles to users by a superadmin;
 *@static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object} A response object
 * @memberof Roles
 */
  static async assignRole(req, res, next) {
    try {
      const { email, newRole } = req.body;
      const { staffId, oldRole } = req;
      const updatedData = await Users.update({
        role: newRole
      }, {
        returning: true,
        where: { userId: staffId },
        raw: true
      });
      if (updatedData[0] < 1) return serverResponse(res, 201, ...['success', 'message', 'No field changed']);
      const {
        updatedAt: createdAt, role: updatedRole
      } = updatedData[1][0];
      const responseObj = {
        email, oldRole, newRole: updatedRole, createdAt
      };
      return serverResponse(res, 201, ...['success', 'data', responseObj]);
    } catch (err) {
      return next(err);
    }
  }
}

const { assignRole, createRole, addNewUser } = Roles;

export { assignRole, createRole, addNewUser };
