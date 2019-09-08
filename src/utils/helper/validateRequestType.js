import { multicityCheck } from '../../validation';
import ResponseGenerator from '../response.util';

const response = new ResponseGenerator();
const checkRequestType = async (req, res, next) => {
  const diffRequest = ['one-way', 'return', 'Multi-city'];
  const { tripType } = req.body;
  if (!diffRequest.includes(tripType)) response.sendError(res, 400, `Request type must be one of ${diffRequest}`);
  switch (tripType) {
    case 'one-way':
      break;
    case 'return':
      break;
    case 'Multi-city':
      await multicityCheck(req, res, next);
      break;
    default:
      return next;
  }
};

export default checkRequestType;
