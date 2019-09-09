/* eslint-disable no-await-in-loop */
import uuidv4 from 'uuid/v4';
import models from '../models';
import response from '../utils/Response';
import { getDetailedLocation } from '../utils/helpers';

import constants from '../utils/constants/constants';

const { serverResponse } = response;

const { Requests } = models;
/**
 *@description A class that handles multicity travel request by a user
 * @class Trips
 */
class Trips {
  /**
   *@description A function that handles multicity travel request by a user
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {object} Details of booked trips
   * @memberof Trips
   */
  static async multiCityRequest(req, res, next) {
    try {
      const { id: userId } = req;
      const {
        departureDate,
        currentOfficeLocation,
        returnDate,
        reason,
        tripType
      } = req.body;
      const { currentOfficeData } = req;
      const { destinationData } = req;
      const tripsData = {
        currentOfficeLocation: Number(currentOfficeLocation),
        tripId: uuidv4(),
        userId,
        departureDate: new Date(departureDate).toUTCString(),
        returnDate: new Date(returnDate).toUTCString(),
        reason,
        tripType,
        requestStatus: 'pending',
        destination: Object.values(destinationData)
      };
      const tripsResult = await Requests.create(tripsData);
      if (tripsResult) {
        const resultObject = {
          userId,
          destinationIDs: Object.values(destinationData),
          currentOfficeLocation: Object.keys(currentOfficeData),
          destinations: Object.keys(destinationData),
          departureDate: new Date(departureDate).toUTCString(),
          returnDate: new Date(returnDate).toUTCString(),
          reason,
          tripType,
          requestStatus: 'pending'
        };
        return serverResponse(res, 201, ...['success', 'data', resultObject]);
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * The user request controller
   * @param { object } req - The request object
   * @param { object } res - The response object
   * @returns { void }
   */
  static async getUserRequestHistory(req, res) {
    const { id } = req;
    const { offset = 0, limit = null } = req.query;

    try {
      const requests = await Requests.findAll({
        where: { userId: id },
        offset,
        limit
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

        const origin = await getDetailedLocation(currentOfficeLocation);

        for (let j = 0; j < destination.length; j += 1) {
          const dest = destination[j];
          const detailedLocation = await getDetailedLocation(dest);
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
      const pagination = {
        limit,
        offset,
        totalCount: data.length,
      };

      return data.length > 0
        ? res.status(200).json({
          status: 200,
          message: constants.requestHistory,
          data,
          pagination
        })
        : res.status(200).json({
          status: 200,
          message: constants.zeroRequestHistory,
          data,
          pagination
        });
    } catch (err) {
      return serverResponse(
        res,
        500,
        ...['error', 'error', 'Error fetching user trips history']
      );
    }
  }
}
export default Trips;
