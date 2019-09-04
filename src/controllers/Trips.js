import uuidv4 from 'uuid/v4';
import datecheck from '../utils/dateCheck';
import models from '../models';
import response from '../utils/Response';

const { serverResponse } = response;

const { Requests } = models;
/**
 *@description A class that handles multicity travel request by a user
 * @class Trips
 */
class Trips {
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
      const duration = datecheck(departureDate, returnDate);
      if (duration === 'negative value') return serverResponse(res, 400, ...['error', 'message', 'Departure date can not be less than Today\'s date']);
      if (!duration) return serverResponse(res, 400, ...['error', 'message', 'Departure date can not be above or the same as the return date']);

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
