import ResponseGenerator from '../utils/response.util';
import models from '../models';
import UserController from './userController';
// import GeneralUtils from '../utils/index';

const { Users } = models;
const response = new ResponseGenerator();
/**
 * @description Handles Request
 * @class RequestController
 */
class RequestController {
  /**
   * @static
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async makeRequest(req, res, next) {
    try {
      if (req.body.type === 'one-way') {
        const result = UserController.requestOneWay;
        if (result) response.sendSuccess(res, 200, result, 'Request Successfully Created');
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @static
   * @param {*} req Request object
   * @param {*} res Response object
   * @param {*} next The next middleware
   * @return {json} Returns json object
   * @memberof UserController
   */
  static async requestOneWay(req) {
   
  }
}
export default RequestController;