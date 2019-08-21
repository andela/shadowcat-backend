import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../models';

const { User } = models;

/**
 * @exports UserController
 *
 * @class UserController
 * description handles users
 */
class UserController{

  /**
   *
   *
   * @static
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) return Response.error(res, 400, 'Invalid email or password');
    const match = await bcrypt.compare(password, user.password);
    if (!match) return Response.error(res, 400, 'Invalid email or password');
    const generate = {
      id: user.id,
      email: user.email
    };
    const token = await Token.create(generate);
    const { exp } = jwt.decode(token);
      user.exp = exp;
      return Response.success(res, 200, userExtractor(user, token), 'User successfully logged in');
    } catch (error) {
      return res.status(500).json({
        status: 500,
        errors: error.message
      })
    }
    
  }
 
}

export default UserController;