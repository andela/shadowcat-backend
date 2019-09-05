import models from '../models';
import response from '../utils/Response';
import { getDetailedLocation } from '../utils/helpers';

const { serverResponse } = response;

const { Requests } = models;

/**
 * The user request controller
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @returns { void }
 */
export const userRequestHistory = async (req, res) => {
  const { id } = req;

  try {
    const requests = await Requests.findAll({
      where: { userId: id }
    });
    const data = [];
    for (let i = 0; i < requests.length; i += 1) {
      const request = requests[i];
      const {
        tripId,
        tripType,
        departureDate,
        returnDate,
        reason,
        requestStatus,
        destination,
        createdAt,
        currentOfficeLocation
      } = request;
      const destinationList = [];

      const origin = await getDetailedLocation(currentOfficeLocation, res);

      for (let j = 0; j < destination.length; j += 1) {
        const dest = destination[j];
        const detailedLocation = await getDetailedLocation(dest, res);
        destinationList.push(detailedLocation);
      }

      const subData = {
        tripId,
        tripType,
        origin,
        destinations: destinationList,
        departureDate,
        returnDate,
        reason,
        requestStatus,
        createdAt
      };

      data.push(subData);
    }

    return serverResponse(res, 200, ...[200, 'data', data]);
  } catch (err) {
    return serverResponse(res, 500, ...['error', 'error', 'Error fetching user trips history']);
  }
};

export default userRequestHistory;
