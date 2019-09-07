import models from '../models';
import ResponseGenerator from '../utils/response.util';

const response = new ResponseGenerator();
const { Comments } = models;

/**
 * @description User comment on travel request
 * @class RequestComment
 */
class RequestComment { 
  /**
  * Update user profile
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async createComment(req, res) {
    const { comment } = req.body;
    const { tripId } = req.params;
    const createComment = await Comments.create({ comment, tripId, userId: req.id });
    return response.sendSuccess(
      res,
      200,
      createComment,
      'User successfully logged in'
    );
  }
}

export default RequestComment;
