/**
 *@description Social Media Login controllers
 * @class SocialMediaLogin
 */
class SocialMediaLogin {
  /**
 *@description The google login method
 * @static
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} User
 * @memberof SocialMediaLogin
 */
  static async googleLogin(req, res, next) {
    try {
      const {
        createdAt, userId, firstname, lastname, email
      } = req.user;
      const status = req.user.newUser ? 201 : 200;
      return res.status(status).json({
        status: 'success',
        data: {
          createdAt, userId, firstname, lastname, email
        }
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
 *@description The facebook login method
 * @static
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} User
 * @memberof SocialMediaLogin
 */
  static async facebookLogin(req, res, next) {
    try {
      const {
        createdAt, userId, firstname, lastname, email
      } = req.user;
      const status = req.user.newUser ? 201 : 200;
      return res.status(status).json({
        status: 'success',
        data: {
          createdAt, userId, firstname, lastname, email
        }
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default SocialMediaLogin;
