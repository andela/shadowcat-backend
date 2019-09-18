import models from '../models';
import response from '../utils/Response';

const { serverResponse } = response;

const { Accommodation, Locations } = models;


/**
 *@description A class that handles
 accommodation registration and other
  accommodation-related functions
   within the application
 * @class Accommodations
 */
class Accommodations {
  /**
 *@description A class method that assigns roles to users by a superadmin;
 *@static
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {Object} A response object
 * @memberof Roles
 */
  static async addAccommodation(req, res, next) {
    try {
      const {
        name, address, description, state, country, services, amenities
      } = req.body;
      const images = [];
      if (req.images.length) images.push(...req.images);
      const checkLocation = await Locations.findOne({
        where: { state, country },
        raw: true
      });
      if (!checkLocation) return serverResponse(res, 400, ...['error', 'message', 'Accommodation facility is not within an Andela office location']);
      const checkAccommodation = await Accommodation.findOne({
        where: { name },
        raw: true
      });
      if (checkAccommodation) return serverResponse(res, 400, ...['error', 'message', 'Accommodation facility already registered']);
      const facilityData = await Accommodation.create({
        locationId: checkLocation.id,
        name,
        address,
        description,
        state,
        country,
        services,
        amenities,
        images
      });
      if (!facilityData) {
        return serverResponse(res, 400, ...[
          'error',
          'message',
          'Check the input data and try again'
        ]);
      }

      const responseObj = {
        accommodationId: facilityData.accommodationId,
        name: facilityData.name,
        address: facilityData.address,
        state: facilityData.state,
        country: facilityData.country,
        description: facilityData.description,
        services: facilityData.services,
        amenities: facilityData.amenities,
        createdAt: facilityData.createdAt
      };
      return serverResponse(res, 201, ...['success', 'data', responseObj]);
    } catch (err) {
      return next(err);
    }
  }
}

const { addAccommodation } = Accommodations;

export default addAccommodation;
