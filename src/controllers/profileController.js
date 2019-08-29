import models from '../models';

const { User } = models;

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
      const { id } = req.params;
      const user = await User.findOne({
        where: { id }
      });
      if (!user) {
        return res.status(404).json({
          message: 'User does not exist',
        });
      }
      const profile = await user;
      return res.status(200).json({
        status: 'success',
        profile,
      });
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
      const { id } = req.params;
      const profileDetails = await (req.body);
      const {
        firstname, lastname, email, gmail, facebook, gender, birthday,
        preferredlanguage, currency, residentialaddress, role, department, linemanager
      } = profileDetails;
      const user = await User.findOne({
        where: { id }
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
        return res.status(200).json({
          status: 'success',
          message: 'profile sucessfully updated',
          updatedDetails,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default ProfileController;
