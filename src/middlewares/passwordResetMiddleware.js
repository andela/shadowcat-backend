
import Token from '../utils/Token';
import Response from '../utils';

const { verifyToken } = Token;
const { errorResponse } = Response;
/**
 *
 *
 * @class Authenticator
 */
class Authenticator {
  /**
   *
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {Method} next
   * @returns{Method} Calls next method
   * @memberof Authenticator
   */
  static async isTokenValid(req, res, next) {
    const msg = 'Access denied.Unauthorized request.';
    try {
      const { token } = req.params;
      // console.log(token, 'token');
      // console.log(req.params, 'token from the params');
      if (!token) {
        return res.status(401).json(errorResponse(msg));
      }
      const verifiedToken = await verifyToken(token);
      if (!verifiedToken) {
        return res.status(401).json(errorResponse(msg));
      }
      // console.log(verifiedToken, 'verified token from authenticator');
      req.params.token = verifiedToken;
      return next();
    } catch (error) {
      // console.log(error, 'token error');
      return res.status(401).json(errorResponse(msg));
    }
  }

  /**
 *
 *
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Method} next
 * @returns{Method} Calls next method on success
 * @memberof Authenticator
 */
  static async doesPasswordMatch(req, res, next) {
    let msg;
    try {
      const { newPassword, confirmPassword } = req.body;
      if (newPassword !== confirmPassword) {
        msg = 'Passwords Do Not Match';
        return res.status(400).json(errorResponse(msg));
      }
      return next();
    } catch (error) {
      msg = 'Internal Server Error';
      return res.status(500).json(errorResponse(msg));
    }
  }
}

export default Authenticator;
