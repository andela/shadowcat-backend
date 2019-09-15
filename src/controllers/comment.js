import models from '../models';
import ResponseGenerator from '../utils/response.util';

const response = new ResponseGenerator();
const { Requests, Comments, Users } = models;

/**
 * @description User comment on travel request
 * @class Comment
 */
class Comment {
  /**
  * create a request trip comment
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async createComment(req, res, next) {
    try {
      const { requestId } = req.params;
      const { comment } = req.body;
      const { id } = req;
      const getTrip = await Requests.findOne({
        where: { id: requestId, userId: id }
      });
      if (!getTrip) {
        return response.sendError(
          res,
          404,
          'No trip request has been made'
        );
      }
      const createComment = await Comments.create({ comment, requestId, userId: req.id });
      return response.sendSuccess(
        res,
        201,
        {
          commentId: createComment.id,
          requestId: getTrip.id,
          tripId: getTrip.tripId,
          userId: getTrip.userId,
          departureDate: getTrip.departureDate,
          returnDate: getTrip.returnDate,
          tripType: getTrip.tripType,
          reason: getTrip.reason,
          currentOfficeLocation: getTrip.currentOfficeLocation,
          requestStatus: getTrip.requestStatus,
          destination: getTrip.destination,
          comment: createComment.comment
        },
        'comment created!'
      );
    } catch (error) {
      return next(error);
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
      if (!getComment) {
        return response.sendError(
          res,
          404,
          'No comment has been made'
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
        updateComment[1],
        'comment updated!'
      );
    } catch (error) {
      return next(error);
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
      const allComments = await Comments.findAll({
        where: { requestId: req.params.requestId }
      });
      if (!allComments[0]) {
        return response.sendError(
          res,
          404,
          'No comment has been made'
        );
      }
      const { userId } = allComments[0];
      const getManager = await Users.findOne({
        where: { userId }
      });
      const manager = getManager.linemanager;
      const getManagerId = await Users.findOne({
        where: { id: manager }
      });
      const getManagerUserId = getManagerId.userId;
      if ((getManagerUserId === id) || (id === allComments[0].userId)) {
        return response.sendSuccess(
          res,
          200,
          allComments,
          'success'
        );
      }
      return response.sendError(
        res,
        403,
        'You can not view these comments'
      );
    } catch (error) {
      return next(error);
    }
  }
}
export default Comment;
