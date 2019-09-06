import chai from 'chai';
import uuidv4 from 'uuid/v4';
import { io } from '../index';

import notifyUserClass from '../controllers/Trips';

const { expect } = chai;

const notifyUserObject = new notifyUserClass(io);

describe('In-app Notification', () => {
  it('should emit a message to the manager on successful trip creation', async () => {
    const request = {
      email: 'chidimma.okafor.c@gmail.com',
      body: {
        tripDetails: {
          tripId: uuidv4(),
          tripLocation: 'Abuja'
        }
      }
    };
    const response = {
      status: (statusCode) => ({
        json: ({ status, data }) => ({
          statusCode,
          status,
          data
        })
      })
    };
    const res = await notifyUserObject.multiCityRequest(request, response, '');
    expect((res)).to.be.an('object');
    expect((res.status)).to.equal('Success');
    expect((res.data)).to.equal(`An email has been sent to your mail: ${request.email}`);
  });
  it('should show trips created as a notification to manager in real time', async () => {
    const request = {
      params: {
        id: 5
      }
    };
    const response = {
      status: (statusCode) => ({
        send: (template) => ({
          statusCode,
          template
        })
      })
    };
    const res = await notifyUserObject.getManagerTrips(request, response);
    expect((res)).to.be.an('object');
    expect((res.template)).to.be.an('string');
  });
});
