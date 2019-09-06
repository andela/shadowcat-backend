import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import user from './__MOCK__/user';
import multiTrip from './__MOCK__/multiTrip';
import server from '../index';
import { authorizationErrors } from '../utils/constants/errorMessages';
import models from '../models';

chai.use(chaiHttp);

const url = '/api/v1/trips/request';
const signupUrl = '/api/v1/auth/signup';
let createdUser = null;
let createdMultiTrip = null;

describe('GET request route', () => {
  // Create a user
  before(async () => {
    const cloneUser = { ...user };
    const res = await chai
      .request(server)
      .post(`${signupUrl}`)
      .send(cloneUser);

    createdUser = res.body.data;
  });

  // Create a trip for user
  before(async () => {
    const cloneTrip = { ...multiTrip };
    const res = await chai
      .request(server)
      .post(`${url}`)
      .set('Authorization', `Bearer ${createdUser.token}`)
      .send(cloneTrip);

    createdMultiTrip = res.body.data;
  });

  // Code cleanup after tests
  after(async () => {
    const { Users, Requests } = models;
    await Requests.destroy({
      where: {
        userId: createdUser.userId
      }
    });
    await Users.destroy({
      where: {
        userId: createdUser.userId
      }
    });
  });

  it('should return 401 with undefined authorization token', done => {
    try {
      chai
        .request(server)
        .get(`${url}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(401);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(401);
          expect(error).to.equal(authorizationErrors.undefinedToken);

          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 401 with invalid authorization token', done => {
    try {
      chai
        .request(server)
        .get(`${url}`)
        .set('Authorization', 'Bearer adfdafsdsffds')
        .send()
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(401);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(401);
          expect(error).to.equal(authorizationErrors.invalidToken);

          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 200 and return user travel history', done => {
    try {
      chai
        .request(server)
        .get(`${url}`)
        .set('Authorization', `Bearer ${createdUser.token}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(200);

          const { body } = res;

          expect(body).to.have.property('status');
          expect(body).to.have.property('data');

          const { status, data } = body;
          expect(status).to.deep.equal(200);
          expect(data).to.be.an('array');
          expect(data.length).to.deep.equal(1);

          const travelDetails = data[0];

          expect(travelDetails).to.have.property('tripId');
          expect(travelDetails).to.have.property('tripType');
          expect(travelDetails).to.have.property('origin');
          expect(travelDetails).to.have.property('destinations');
          expect(travelDetails).to.have.property('departureDate');
          expect(travelDetails).to.have.property('returnDate');
          expect(travelDetails).to.have.property('reason');
          expect(travelDetails).to.have.property('requestStatus');
          expect(travelDetails).to.have.property('createdAt');

          const {
            tripType,
            origin,
            destinations,
            departureDate,
            returnDate,
            reason,
            requestStatus,
          } = travelDetails;

          expect(tripType).to.deep.equal(createdMultiTrip.tripType);
          expect(destinations).to.be.an('array');
          expect(destinations).to.have.length(2);
          expect(new Date(departureDate).toUTCString()).to.equal(createdMultiTrip.departureDate);
          expect(new Date(returnDate).toUTCString()).to.equal(
            createdMultiTrip.returnDate
          );
          expect(reason).to.equal(createdMultiTrip.reason);
          expect(requestStatus).to.equal(createdMultiTrip.requestStatus);

          expect(origin).to.has.property('locationId');
          expect(origin).to.has.property('locationName');
          expect(origin).to.has.property('locationAddress');

          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
});
