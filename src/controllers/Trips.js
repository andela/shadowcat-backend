import uuidv4 from 'uuid/v4';
import models from '../models';
import response from '../utils/Response';
import validatedate from '../utils/helper/date';

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


  static async returnTripRequest(req, res, next) {
    try {
      const { id: userId} = req;
      const { departureDate, returnDate, currentOfficeLocation, accomodation, reason, tripType, destination } = req.body;
      const departureDateUTC = new Date(departureDate);
      const returnDateUTC = new Date(returnDate);

      const duration = validatedate(departureDateUTC, returnDateUTC);
      if (!duration) {
        return res.status(400).json({
          status: 'error',
          message: 'Departure and Return date can"t be the same'
        });
      }

      const returnResult = await Requests.create({
        currentOfficeLocation,
        tripId: uuidv4(),
        userId,
        departureDate: new Date(departureDate).toUTCString(),
        returnDate: new Date(returnDate).toUTCString(),
        accomodation,
        reason,
        tripType,
        requestStatus: 'pending',
        destination
      });
      if (returnResult) {
        return res.status(201).json({
          status: 'success',
          data: {
            userId,
            destination,
            currentOfficeLocation,
            departureDate,
            returnDate,
            accomodation,
            reason,
            tripType,
            requestStatus: 'pending'
          }
        });
      }
    } catch (error) {
      return next(error);
    }
  }

}
export default Trips;
