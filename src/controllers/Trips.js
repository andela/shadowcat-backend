import uuidv4 from 'uuid/v4';
import notifyUserService from '../services/notifyUserService';
import response from '../utils/Response';
import passwordEmail from '../utils/Mailer';
import userService from '../services/passwordResetService';
import mailTemplate from '../utils/notifyUserEmailTemplate';
import htmlTemplate from '../utils/dummyIndex';
import models from '../models';
import socketEmission from '../services/socketEmission';


const { serverResponse } = response;
const { getUser } = userService;
const { createNotification } = notifyUserService;
const { sendEmail } = passwordEmail;
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
      const locations = Object.keys(destinationData).join(', ');
      const tripDetailsEmail = {
        locations,
        departureDate: new Date(departureDate).toUTCString(),
        returnDate: new Date(returnDate).toUTCString()
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
          destinationIDs: Object.values(destinationData),
          currentOfficeLocation: Object.keys(currentOfficeData),
          destinations: Object.keys(destinationData),
          departureDate: new Date(departureDate).toUTCString(),
          returnDate: new Date(returnDate).toUTCString(),
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

  /**
 *
 *
 * @param {object} req
 * @param {object} res
 * @returns{html}template
 * @memberof Trips
 */
  static async getManagerTrips(req, res) {
    const { id } = req.params;

    return res.status(200).send(htmlTemplate(id));
  }
}
export default Trips;
