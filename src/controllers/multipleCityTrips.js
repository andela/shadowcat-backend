import uuidv4 from 'uuid/v4';
import { Op } from 'sequelize';
import datecheck from '../utils/dateCheck';
import models from '../models';
import response from '../utils/Response';

const { serverResponse } = response;

const { Trips, Locations } = models;
/**
 *@description A class that handles multicity travel request by a user
 * @class MultiCityTrips
 */
class MultiCityTrips {
/**
 *@description A function that handles multicity travel request by a user
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {object} Details of booked trips
 * @memberof MultiCityTrips
 */
  static async multiCityRequest(req, res, next) {
    try {
      const { id: userId } = req;
      const {
        departureDate, returnDate, currentOfficeLocation, reason, tripType, ...destinations
      } = req.body;
      const duration = datecheck(departureDate, returnDate);
      if (duration === 'negative value') return serverResponse(res, 400, ...['error', 'message', 'Departure date can not be less than Today\'s date']);
      if (!duration) return serverResponse(res, 400, ...['error', 'message', 'Departure date can not be above or thesame as the return date']);
      const travelLocations = Object.values(destinations);
      const locationsData = await Locations.findAll({
        attributes: ['id', 'locationName'],
        where: { locationName: { [Op.or]: [currentOfficeLocation, ...travelLocations] } },
        raw: true
      });
      const locationId = locationsData.map((data) => data.id);
      const locationNames = locationsData.map((data) => data.locationName);
      if (locationsData.length !== travelLocations.length + 1) return serverResponse(res, 422, ...['error', 'message', 'Enter a valid Andela office location']);
      const destinationId = locationId.slice(1);
      const tripsData = {
        currentOfficeLocation: locationNames[0],
        tripId: uuidv4(),
        user_id: userId,
        departureDate: new Date(departureDate).toUTCString(),
        returnDate: new Date(returnDate).toUTCString(),
        reason,
        tripType,
        requestStatus: 'pending',
        destinations: destinationId
      };
      const tripsResult = await Trips.create(tripsData);
      if (tripsResult) {
        const resultObject = {
          user_id: userId,
          destinationIDs: destinationId,
          current_office_location: currentOfficeLocation,
          destinations: travelLocations,
          departure_date: new Date(departureDate).toUTCString(),
          return_date: new Date(returnDate).toUTCString(),
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
export default MultiCityTrips;
