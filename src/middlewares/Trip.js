import Model from '../models';
import response from '../utils/Response';

const { Requests, Users } = Model;
const { errorResponse } = response;
/**
 *
 *
 * @class tripAuthenticator
 */
class tripAuthenticator {
  /**
   *
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {Method} next
   * @returns{Object}User
   * @memberof tripAuthenticator
   */
  static async doesTripExist(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id, 'from params middleware');
      const theTrip = await Requests.findOne({
        where: { tripId: id },
        raw: true
      });
      console.log(theTrip, 'from middleware');
      if (!theTrip) {
        return res.status(404).json(errorResponse(`Cannot Find Trip With Id: ${id}`));
      }
      const { userId } = theTrip;
      req.body.userId = userId;
      return next();
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
   * @param {method} next
   * @returns{calls}the next method
   * @memberof tripAuthenticator
   */
  static async canManagerChangeTripStatus(req, res, next) {
    try {
      const { userId: userIdBody } = req.body;
      const { lineManagerId } = req;
      console.log(lineManagerId, 'id from req middleware');
      const theUser = await Users.findOne({
        where: { userId: userIdBody },
        raw: true
      });
      console.log(theUser, 'User from middleware');
      const { linemanager } = theUser;
      console.log(linemanager, 'from db in middleware');
      if (linemanager !== lineManagerId) {
        return res.status(403).json(errorResponse('Unauthorized Request, You cannot change the status of this trip'));
      }
      return next();
    } catch (error) {
      return res.status(500).json(errorResponse('Internal Server Error'));
    }
  }
}


export default tripAuthenticator;
