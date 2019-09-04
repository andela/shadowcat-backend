/* eslint-disable no-await-in-loop */
import models from '../models';
import response from '../utils/Response';
import { getDetailedLocation } from '../utils/helpers';

const { serverResponse } = response;

const { Requests } = models;

/**
 * The signup controller
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @returns { void }
 */
export const userRequestHistory = async (req, res) => {
  const { id } = req;
  let requests;
  try {
    requests = await Requests.findAll({
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
        destinations,
        createdAt,
        currentOfficeLocation
      } = request;
      const destinationList = [];

      const origin = await getDetailedLocation(currentOfficeLocation, res);
      for (let j = 0; j < destinations.length; j += 1) {
        const destination = destinations[j];
        const detailedLocation = await getDetailedLocation(destination, res);
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
    console.log(err);
    return serverResponse(res, 500, ...['error', 'error', 'Error fetching user trips history']);
  }
};

export default userRequestHistory;
