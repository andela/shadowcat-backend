import models from '../models';
import response from '../utils/Response';

const { serverResponse } = response;

const { Rooms, Accommodation } = models;


/**
 *@description A class that handles room creation within the application
 * @class Roles
 */
class Room {
  /**
 *@description A class method that assigns roles to users by a superadmin;
 *@static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object} A response object
 * @memberof Roles
 */
  static async addRoom(req, res, next) {
    try {
      const { accommodationId: id } = req.params;
      const { name, cost, images } = req.body;
      const checkAccommodation = await Accommodation.findOne({
        where: { id },
        raw: true
      });
      if (!checkAccommodation) return serverResponse(res, 404, ...['error', 'message', 'Accommodation facility not found']);
      const checkRoom = await Rooms.findOne({
        where: { name },
        raw: true
      });
      if (checkRoom) return serverResponse(res, 400, ...['error', 'message', 'Room already exist']);
      const facilityData = await Rooms.create({
        accommodationId: checkAccommodation.id, name, cost, status: 'available', images
      });
      if (!facilityData) return serverResponse(res, 400, ...['error', 'message', 'Check the input data and try again']);

      const responseObj = {
        roomId: facilityData.id,
        accommodationId: facilityData.accommodationId,
        name: facilityData.name,
        address: facilityData.cost,
        status: facilityData.status,
        createdAt: facilityData.createdAt
      };
      return serverResponse(res, 201, ...['success', 'data', responseObj]);
    } catch (err) {
      return next(err);
    }
  }
}

const { addRoom } = Room;

export default addRoom;
