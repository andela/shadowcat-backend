import uuidv4 from 'uuid/v4';
import validatedate  from '../utils/helper/date';
import models from '../models';

const { Trips} = models;
/**
 *@description A class that handles ReturnTrip travel request by a user
 * @class ReturnTrip
 */
class ReturnTrip {
    /**
     *@description A function that handles ReturnTrip travel request by a user
     * @static
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     * @returns {object} Details of booked trips
     * @memberof ReturnTrip
     */
   
    static async returnTripRequest(req, res, next) {
        try {
            const { id } = req;
            const {
                departureDate, returnDate, currentOfficeLocation, accomodation, reason, tripType, destination
            } = req.body;
            const departureDateUTC = new Date(departureDate);
            const returnDateUTC = new Date(returnDate);

            const duration = validatedate(departureDateUTC, returnDateUTC);
            if (!duration) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Departure date and Return date cant be the same'
                });
            }

            const tripsResult = await Trips.create({
                currentOfficeLocation,
                tripId: uuidv4(),
                user_id: id,
                departureDate: new Date(departureDate).toUTCString(),
                returnDate: new Date(returnDate).toUTCString(),
                accomodation,
                reason,
                tripType,
                requestStatus: 'pending',
                destination
            });
            if (tripsResult) {
                return res.status(201).json({
                    status: 'success',
                    data: {
                        user_id: id,
                        destination,
                        current_office_location: currentOfficeLocation,
                        departure_date: departureDateUTC,
                        return_date: returnDateUTC,
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