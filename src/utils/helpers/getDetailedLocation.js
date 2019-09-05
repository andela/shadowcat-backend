import models from '../../models';
import response from '../Response';

const { serverResponse } = response;

const { Locations } = models;

/**
 * Returns the id, name and address of a location
 * @param { array } destination - Arary of the destination IDs
 * @param { object } res - The response object
 * @returns { object } object containing id, name and address of a location
 */
const getDetailedLocation = async (destination, res) => {
  try {
    const location = await Locations.findOne({
      where: { id: destination }
    });
    const { dataValues } = location;
    const { id, locationName, locationAddress } = dataValues;
    const returnDestination = {
      locationId: id,
      locationName,
      locationAddress
    };

    return returnDestination;
  } catch (err) {
    return serverResponse(
      res,
      500,
      ...['error', 'error', 'a location does not exist']
    );
  }
};

export default getDetailedLocation;
