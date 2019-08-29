import UserService from '../services/user.service';
import ResponseGenerator from '../utils/response.util';

const response = new ResponseGenerator();
/**
 * @description Handles Users
 * @class UserController
 */
class UserController {
  /**
   * @static
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async login(req, res) {
    try {
      const user = await UserService.login(req);
      if (user) {
        return response.sendSuccess(
          res,
          200,
          user,
          'User successfully logged in'
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}
export default UserController;
