import uuidv4 from 'uuid/v4';
import { Op } from 'sequelize';
//import datecheck from '../utils/dateCheck';
import models from '../models';

const { Trips, Locations } = models;
/**
 *@description A class that handles multicity travel request by a user
 * @class MultiCityTrips
 */
class ReturnTrip {
    /**
     *@description A function that handles multicity travel request by a user
     * @static
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     * @returns {object} Details of booked trips
     * @memberof MultiCityTrips
     */
    static async returnTripRequest(req, res, next) {
        try {
            const { id: userId } = req;
            const {
                departureDate, returnDate, currentOfficeLocation, accomodation, reason, tripType, ...destinations
            } = req.body;
            const duration = datecheck(departureDate, returnDate);
            if (!duration) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Departure date and Return date cant be the same'
                });
            }
            const travelLocations = Object.values(destinations);
            const locationsData = await Locations.findAll({
                attributes: ['id', 'locationName'],
                where: {
                    locationName: {
                        [Op.or]: [currentOfficeLocation, ...travelLocations]
                    }
                },
                raw: true
            });
            const locationId = locationsData.map((data) => data.id);
            const locationNames = locationsData.map((data) => data.locationName);
            if (locationsData.length !== travelLocations.length + 1) {
                return res.status(422).json({
                    status: 'error',
                    message: 'Enter a valid Andela office location'
                });
            }
            const destinationId = locationId.slice(1);
            const tripsResult = await Trips.create({
                currentOfficeLocation: locationNames[0],
                tripId: uuidv4(),
                user_id: userId,
                departureDate: new Date(departureDate).toUTCString(),
                returnDate: new Date(returnDate).toUTCString(),
                accomodation,
                reason,
                tripType,
                requestStatus: 'pending',
                destinations: [...destinationId]
            });
            if (tripsResult) {
                return res.status(201).json({
                    status: 'success',
                    data: {
                        user_id: userId,
                        destinationIDs: destinationId,
                        current_office_location: currentOfficeLocation,
                        destinations: travelLocations,
                        departure_date: new Date(departureDate).toUTCString(),
                        return_date: new Date(returnDate).toUTCString(),
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
export default ReturnTrip;