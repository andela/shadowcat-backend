/* eslint-disable no-useless-catch */
import models from '../models';
import GeneralUtils from '../utils/index';
import Auth from '../middlewares/auth';

const { Users } = models;

/** Signs in user
 * @description Operate on a user and his account
 * @param {object} a new user object
 */
class Userservice {
  /** Signs user into account
   * @description signs user into their account
   * @body {object} a new user object
   * @param {object} req new user object
   * @returns {object} return object
   */
  static async login(req) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({
        where: {
          email
        }
      });
      if (user) {
        const bycrptResponse = GeneralUtils.validate(password, user.password);
        if (bycrptResponse) {
          const {
            id, isAdmin, firstname, lastname
          } = user;
          const token = await Auth.signJwt({
            id,
            isAdmin
          });
          return {
            token,
            id,
            isAdmin,
            firstname,
            lastname,
            email
          };
        }
      }
      throw new Error('Invalid email or password');
    } catch (err) {
      throw err;
    }
  }
}

export default Userservice;
