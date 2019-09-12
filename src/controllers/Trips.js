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
 *@description A function that handles different trips request
 * @static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {object} Details of booked trips
 * @memberof Trips
 */
  static async tripRequest(req, res, next) {
    const { tripType } = req.body;
    switch (tripType) {
      case 'one-way':
        await Trips.oneWay(req, res, next);
        break;
      case 'return':
        await Trips.returnTrip(req, res, next);
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


  
  /**
*@description A function that handles one-way travel request by a user
* @static
* @param {Object} req
* @param {Object} res
* @param {Object} next
* @returns {object} Details of booked trips
* @memberof Trips
*/
  static async returnTrip(req, res, next) {
    try {
      const { email } = req;
      const aUser = await getUser(email);
      if (!aUser) {
        return serverResponse(res, 404, ...['error', 'message', `Cannot Find User With Email: ${email}`]);
      }
      const {
        userId,
        linemanager: lineManagerUser,
        firstname: firstName,
        lastname: lastName,
        notifyemail: notifyEmail
      } = aUser;
      if (!lineManagerUser) {
        return serverResponse(res, 400, ...['error', 'message', 'Line Manager must be present to continue']);
      }
      const {
        currentOfficeLocation, reason, tripType, accommodation, departureDate, returnDate
      } = req.body;
      const { currentOfficeLocationData } = req;
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
        destination: Object.values(destinationData),
        accommodation
      };
      const tripsResult = await Requests.create(tripsData);
      const locations = Object.keys(destinationData).join(', ');
      const tripDetailsEmail = {
        locations,
        departureDate: new Date(departureDate).toUTCString(),
      };
      if (notifyEmail) {
        const templateFile = mailTemplate(aUser, tripDetailsEmail);
        await sendEmail(email, templateFile, 'Trip Confirmation');
      }
      const newNotification = {
        tripId: tripsResult.tripId,
        lineManager: lineManagerUser,
        userId,
        content: 'Created',
        isViewed: false,
        type: 'Trip',
        createdAt: tripsResult.createdAt,
        updatedAt: tripsResult.createdAt
      };
      await createNotification(newNotification);
      const emitMessage = `${firstName} ${lastName}
      Just Booked a trip to ${locations} on
       ${tripsResult.createdAt}`;
      socketEmission.emission(`${lineManagerUser}`, emitMessage);
      if (tripsResult) {
        const resultObject = {
          userId,
          destinationID: Object.values(destinationData)[0],
          currentOfficeLocation: Object.keys(currentOfficeLocationData)[0],
          destination: Object.keys(destinationData)[0],
          departureDate: new Date(departureDate).toUTCString(),
          returnDate: new Date(returnDate).toUTCString(),
          accommodation,
          reason,
          tripType,
          requestStatus: 'pending'
        };
        return serverResponse(res, 201, ...['success, an email has been sent to you', 'data', resultObject]);
      }
    } catch (error) {
      return next(error);
    }
  }

  

}
export default Trips;
