import autoBind from 'auto-bind';
import notifyUserService from '../services/notifyUserService';

import response from '../utils/Response';

import passwordEmail from '../utils/Mailer';

import userService from '../services/passwordResetService';


import mailTemplate from '../utils/notifyUserEmailTemplate';

import htmlTemplate from '../utils/dummyIndex';

const { getUser } = userService;

const { successResponse, errorResponse } = response;

const { createNotification } = notifyUserService;

const { sendEmail } = passwordEmail;
/**
 *
 *
 * @class notifyUserController
 */
class notifyUserController {
  /**
   *Creates an instance of notifyUserController.
   * @param {socket.io} io
   * @memberof notifyUserController
   */
  constructor(io) {
    this.io = io;
    autoBind(this);
  }

  /**
 *
 *
 * @param {object} req
 * @param {object} res
 * @returns {response} response
 * @memberof notifyUserController
 */
  async createNewTrip(req, res) {
    const { token, ...tripDetails } = req.body;
    try {
      const { email } = token;
      const { tripId: tripIdRequest, tripLocation: tripLocationReq } = tripDetails;
      const aUser = await getUser(email);
      if (!aUser) {
        return res.status(404).json(errorResponse(`Cannot Find User With Email: ${email}`));
      }
      const tripDate = new Date();
      const {
        userId: userIdUser, managerId: managerIdUser, firstname, lastname, notifyMeEmail
      } = aUser;
      const templateFile = mailTemplate(aUser, tripDetails);
      const newNotification = {
        tripId: tripIdRequest,
        managerId: managerIdUser,
        userId: userIdUser,
        content: 'Created',
        isViewed: false,
        createdAt: tripDate,
        updatedAt: tripDate
      };
      const emitMessage = `${firstname} ${lastname} 
      Just Booked a trip to ${tripLocationReq} on 
       ${tripDate}`;
      await createNotification(newNotification);
      if (notifyMeEmail) {
        await sendEmail(email, templateFile, 'Trip Confirmation');
      }
      this.io.emit(`${managerIdUser}`, emitMessage);
      return res.status(201).json(successResponse(`Success, an email has been sent to your mail: ${email}`));
    } catch (error) {
      return res.status(500).json(errorResponse('Internal Server Error'));
    }
  }

  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns{object} Success Message
 * @memberof passwordResetController
 */
  async getManagerTrips(req, res) {
    const { id } = req.params;
    try {
      this.io.on(`${id}`, (data) => data);
      return res.send(htmlTemplate(id));
    } catch (error) {
      return res.status(500).json(errorResponse('Internal Server Error'));
    }
  }
}


export default notifyUserController;
