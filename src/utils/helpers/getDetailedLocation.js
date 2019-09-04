import models from '../../models';
import response from '../Response';

const { serverResponse } = response;

const { Locations } = models;

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
    console.log(err);
    return serverResponse(
      res,
      500,
      ...['error', 'error', 'a location does not exist']
    );
  }
};

export default getDetailedLocation;
