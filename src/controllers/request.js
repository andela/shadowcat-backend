import ResponseGenerator from '../utils/response.util';
import models from '../models';
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
  static async oneWay(req, res, next) {
    try {
      console.log('zzzzzzzzzzzzzzzzzzzzzzzz');
      return;
    } catch (err) {
      next(err);
    }
  }
}
export default RequestController;
