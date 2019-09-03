import models from '../models';
import response from '../utils/Response';

const { serverResponse } = response;

const { Trips } = models;

/**
 * The signup controller
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @returns { void }
 */
export const userRequestHistory = async (req, res) => {
  const { id } = req;
  return serverResponse(res, 200, ...['success', 'data', { id }]);
};

export default userRequestHistory;
