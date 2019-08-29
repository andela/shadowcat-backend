import UserService from '../services/user.service';
import ResponseGenerator from '../utils/response.util';

const response = new ResponseGenerator();

<<<<<<< Updated upstream
const { Users } = models;
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      const { email, password } = req.body;
      const user = await Users.findOne({
        where: {
          email
        }
      });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email or password',
        });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email or password',
        });
=======
      const user = await UserService.login(req);
      if (user) {
        return response.sendSuccess(
          res,
          200,
          user,
          'User successfully logged in'
        );
>>>>>>> Stashed changes
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}
export default UserController;
