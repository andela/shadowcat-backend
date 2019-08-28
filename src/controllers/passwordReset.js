import bcrypt from 'bcryptjs';

import UserService from '../services/passwordResetService';

import Response from '../utils/Response';

import PasswordEmail from '../utils/Mailer';

import Template from '../utils/Template';


const { successResponse, errorResponse } = Response;

const { getUser, updateUserPassword } = UserService;

const { sendEmail } = PasswordEmail;
/**
 *
 *
 * @class UserController
 */
class UserController {
/**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns{object} User
 * @memberof UserController
 */
  static async getAUser(req, res) {
    const { email } = req.body;
    // console.log(email, 'from controller');
    try {
      const AUser = await getUser(email);
      if (!AUser) {
        return res.status(404).json(errorResponse(`Cannot Find User With Email: ${email}`));
      }
      // console.log(AUser, 'chima from controller');
      const { id } = AUser;
      try {
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        const templateArray = Template(AUser, fullUrl);
        const [template, token] = templateArray;
        await sendEmail(email, template);
        return res.status(200).json(successResponse('Success, an email has been sent to you', { id, email, token }));
      } catch (error) {
        // console.log(error, 'error sending mail');
        return res.status(500).json(errorResponse('Internal Server Error'));
      }
    } catch (error) {
      // console.log('we made it thus fare', error);

      // console.log(error, 'error with try block in controller');
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
 * @memberof UserController
 */
  static async updatePassword(req, res) {
    const { newPassword } = req.body;
    const { token } = req.params;
    const { id, email } = token;
    const newHashPassword = await bcrypt.hashSync(`${newPassword}`, 10);
    try {
      await updateUserPassword(id, { password: newHashPassword });
      // console.log(updatePassword, 'updatePassword from controller');
      const theUser = await getUser(email);
      const { id: UserId, email: UserEmail } = theUser;
      return res.status(201).json(successResponse('Password Successfully Updated', { UserId, UserEmail }));
    } catch (error) {
      // console.log(error, 'error from controller');
      return res.status(500).json(errorResponse('Internal Server Error'));
    }
  }
}


export default UserController;
