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
  static async makeRequest(req, res, next) {
    try {
      if (req.body.type === 'oneWay') {
        // const result = UserController.requestOneWay;
        // if (result) response.sendSuccess(res, 200, result, 'Request Successfully Created');
        const { id: userId } = req;
      const {
        currentOfficeLocation, destination, departureDate, travelReasons, accommodation, tripType
      } = req.body;
      }
    } catch (err) {
      next(err);
    }
  }
}
export default RequestController;
