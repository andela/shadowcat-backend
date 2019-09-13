import Model from '../models';

const { Requests } = Model;
/**
 *
 *
 * @class tripService
 */
class tripService {
  /**
   *
   *
   * @static
   * @param {String} id
   * @returns{Object} User
   * @memberof tripService
   */
  static async getTrip(id) {
    try {
      const theTrip = await Requests.findOne({
        where: { tripId: id }
      });
      return theTrip;
    } catch (error) {
      return false;
    }
  }

  /**
 *
 *
 * @static
 * @param {Integer} id
 * @param {String} updateTripStatus
 * @returns {Object} User
 * @memberof tripService
 */
  static async updateTripStatus(id, updateTripStatus) {
    try {
      const tripUpdate = await Requests.update(updateTripStatus, { where: { tripId: id } });
      return tripUpdate;
    } catch (error) {
      return false;
    }
  }
}


export default tripService;
