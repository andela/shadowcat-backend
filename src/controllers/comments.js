import models from '../models';
import ResponseGenerator from '../utils/response.util';

const response = new ResponseGenerator();
const { Requests, Comments } = models;

/**
 * @description User comment on travel request
 * @class RequestComment
 */
class RequestComment {
  /**
  * create request comment
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async createComment(req, res, next) {
    try {
      const { comment } = req.body;
      const { id } = req;
      const getTrip = await Requests.findOne({
        where: { userId: id }
      });
      const { tripId } = getTrip;
      if (!tripId) {
        return response.sendError(
          res,
          404,
          'No trip request have been made'
        );
      }
      const createComment = await Comments.create({ comment, tripId, userId: req.id });
      return response.sendSuccess(
        res,
        201,
        createComment,
        'comment created!'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
  * update request comment
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async updateComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const getComment = await Comments.findOne({
        where: { id: commentId }
      });
      if (getComment === null) {
        return response.sendError(
          res,
          404,
          'No comment have been made'
        );
      }
      const updateComment = await Comments.update({ comment: req.body.comment },
        {
          returning: true,
          where: { id: commentId, userId: req.id }
        });
      return response.sendSuccess(
        res,
        200,
        updateComment[1
        ],
        'comment updated!'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all comments
   * @static
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @param {object} next - The Next Middleware
   * @return {json} - Returns json Object
   * @memberof RequestComment
   * @static
   */
  static async getComment(req, res, next) {
    try {
      const { id } = req;
      const getComments = await Comments.findAll({
        where: { userId: id }
      });
      if (!getComments) {
        return response.sendError(
          res,
          404,
          'No comment have been made'
        );
      }
      return response.sendSuccess(
        res,
        200,
        getComments,
        'sucess'
      )
    } catch (error) {
      next(error);
    }
  }
}
export default RequestComment;
