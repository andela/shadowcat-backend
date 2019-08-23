import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../models';

const { User } = models;

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
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
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
      }
      const payload = {
        id: user.id,
        email: user.email
      };
      jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET, (err, token) => res.status(201).json({
          status: 'success', message: 'User successfully logged in', payload, token
        })
        );
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
