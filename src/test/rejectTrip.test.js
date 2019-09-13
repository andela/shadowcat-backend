import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import rejectTrip from './__MOCK__/rejectTrip';
import server from '../index';


chai.use(chaiHttp);

const {
  correctManager, correctManagerWrongTrip, correctRequester,
  correctTripId, wrongTripId, status, invalidToken
} = rejectTrip;

const tripUrl = '/api/v1/trips/manager/request/';
const loginUrl = '/api/v1/auth/login';
let correctTestToken = null;
const correctTokenWrongTrip = null;


describe('PUT request by manager', () => {
  // sign in a user
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(correctManager)
      .end((err, res) => {
        if (err) return done(err);
        correctTestToken = res.body.data.token;
        return done();
      });
  });
  it('should return 200 when trip has been rejected', done => {
    try {
      chai
        .request(server)
        .put(`${tripUrl}/${correctTripId}`)
        .send(status)
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
  it('should return 400 with invalid limit query and offset', done => {
    try {
      chai
        .request(server)
        .get(`${url}?limit=sh1&offset=121asd`)
        .set('Authorization', `Bearer ${testToken}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(400);
          expect(error).to.have.property('limit');
          expect(error).to.have.property('offset');

          const { limit, offset } = error;
          expect(limit[0]).to.equal(userRequestHistoryErrors.nonIntegerLimit);
          expect(offset[0]).to.equal(userRequestHistoryErrors.nonIntegerOffset);

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
        .set('Authorization', `Bearer ${testToken}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(200);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('data');
          expect(body).to.have.property('message');
          expect(body).to.have.property('pagination');

          const {
            status, message, data, pagination
          } = body;

          expect(message).to.equal(constants.requestHistory);
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

          expect(pagination).to.be.an('object');
          expect(pagination).to.have.property('limit');
          expect(pagination).to.have.property('offset');
          expect(pagination).to.have.property('totalCount');

          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
});
