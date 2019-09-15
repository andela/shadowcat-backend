import ResponseGenerator from '../utils/response.util';
import models from '../models';

const response = new ResponseGenerator();
const { Comments } = models;

/**
 * @class VerifyUser
 */
class VerifyUser {
  /**
  * verify userId
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async verifyUserId(req, res, next) {
    try {
      const { commentId } = req.params;
      const getUser = await Comments.findOne({
        where: { id: commentId }
      });
      if (!getUser) {
        return response.sendError(
          res,
          404,
          'No comment has been made'
        );
      }
      const { id } = req;
      if (id !== getUser.userId) {
        return response.sendError(
          res,
          403,
          'You can not update someone else comment'
        );
      }
      next();
    } catch (error) {
      return next(error);
    }
  }
}
export default VerifyUser;
