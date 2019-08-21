import Model from '../models';

const { User } = Model;
/**
 *
 *
 * @class UserService
 */
class UserService {
  /**
   *
   *
   * @static
   * @param {String} email
   * @returns{Object} User
   * @memberof UserService
   */
  static async getUser(email) {
    try {
      const theUser = await User.findOne({
        where: { email: String(email) }
      });
      // console.log(theUser, 'single user from service');

      return theUser;
    } catch (error) {
      // console.log(error, 'error from service');
      // throw error;
      return false;
    }
  }

  /**
 *
 *
 * @static
 * @param {Integer} id
 * @param {String} updatePassword
 * @returns {Object} User
 * @memberof UserService
 */
  static async updateUserPassword(id, updatePassword) {
    try {
      const passwordUpdate = await User.update(updatePassword, { where: { id: Number(id) } });
      // console.log(passwordUpdate, 'password update from service');
      return passwordUpdate;
    } catch (error) {
      // console.log(error, 'error from query');
      return false;
    }
  }
}


export default UserService;
