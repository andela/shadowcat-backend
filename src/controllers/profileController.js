import ResponseGenerator from '../utils/response.util';
import models from '../models';

const { Users } = models;
const response = new ResponseGenerator();
/**
 * @exports ProfileController
 * @class ProfileController
 * @description Handles User Profile
 */
class ProfileController {
  /**
   * @static
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
   */
  static async getProfile(req, res, next) {
    try {
      const { id } = req;
      const user = await Users.findOne({
        where: { userId: id }
      });
      if (!user) {
        return response.sendError(
          res,
          404,
          'user not found'
        );
      }
      return response.sendSuccess(
        res,
        200,
        user,
        'success',
      );
    } catch (error) {
      next(error);
    }
  }

  /**
  * Update user profile
  * @async
  * @param  {object} req - Request object
  * @param {object} res - Response object
  * @param {object} next The next middleware
  * @return {json} Returns json object
  * @static
  */
  static async updateProfile(req, res, next) {
    try {
      const { id } = req;
      const profileDetails = await (req.body);
      const {
        firstname, lastname, email, gmail, facebook, gender, birthday,
        preferredlanguage, currency, residentialaddress, role, department, linemanager
      } = profileDetails;
      const user = await Users.findOne({
        where: { userId: id }
      });
      if (user !== undefined) {
        const updatedDetails = await user.update({
          firstname,
          lastname,
          email,
          gmail,
          facebook,
          gender,
          birthday,
          preferredlanguage,
          currency,
          residentialaddress,
          role,
          department,
          linemanager
        });
        return response.sendSuccess(
          res,
          200,
          updatedDetails,
          'profile sucessfully updated',
        );
      }
      return response.sendError(
        res,
        404,
        'user does not exist'
      );
    } catch (error) {
      next(error);
    }
  }
}

export default ProfileController;
