import uuidv4 from 'uuid/v4';
import models from '../models';
import response from '../utils/Response';
import ResponseGenerator from '../utils/response.util';

const responsegen = new ResponseGenerator();

const { serverResponse } = response;

const { Requests } = models;
/**
 *@description A class that handles travel request by a user
 * @class Trips
 */
class Trips {

/**
*@description A function that handles different trips request
* @static
* @param {Object} req
* @param {Object} res
* @param {Object} next
* @returns {object} Details of booked trips
* @memberof Trips
*/
static async tripRequest (req, res, next) {
  const { tripType } = req.body;
  switch (tripType) {
    case 'one-way':
      await Trips.oneWay(req, res, next);
      break;
    case 'return':
      await Trips.return(req, res, next);
      break;
    case 'Multi-city':
      await Trips.multiCityRequest(req, res, next);
      break;
    default:
      return responsegen.sendError(
        res,
        500,
        'Something went wrong, please check type of request and try again'
      );
  }
}

/**
 *@description A function that handles one-way travel request by a user
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {object} Details of booked trips
 * @memberof Trips
 */

 static async oneWay (req, res, next) {

 }

  /**
  *@description A function that handles return travel request by a user
  * @static
  * @param {Object} req
  * @param {Object} res
  * @param {Object} next
  * @returns {object} Details of booked trips
  * @memberof Trips
  */

  static async return(req, res, next) {

  }

/**
 *@description A function that handles multicity travel request by a user
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {object} Details of booked trips
 * @memberof Trips
 */
  static async multiCityRequest(req, res, next) {
    try {
      const { id: userId } = req;
      const {
        departureDate, currentOfficeLocation, returnDate, reason, tripType
      } = req.body;
      const { currentOfficeData } = req;
      const { destinationData } = req;
      const tripsData = {
        currentOfficeLocation: Number(currentOfficeLocation),
        tripId: uuidv4(),
        userId,
        departureDate: new Date(departureDate).toUTCString(),
        returnDate: new Date(returnDate).toUTCString(),
        reason,
        tripType,
        requestStatus: 'pending',
        destination: Object.values(destinationData)
      };
      const tripsResult = await Requests.create(tripsData);
      if (tripsResult) {
        const resultObject = {
          userId,
          destinationIDs: Object.values(destinationData),
          currentOfficeLocation: Object.keys(currentOfficeData),
          destinations: Object.keys(destinationData),
          departureDate: new Date(departureDate).toUTCString(),
          returnDate: new Date(returnDate).toUTCString(),
          reason,
          tripType,
          requestStatus: 'pending'
        };
        return serverResponse(res, 201, ...['success', 'data', resultObject]);
      }
    } catch (error) {
      return next(error);
    }
  }
}
export default Trips;
