import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import rejectTrip from './__MOCK__/rejectTrip';
import server from '../index';


chai.use(chaiHttp);

const {
  correctManager, correctManagerWrongTrip, correctRequester,
  correctTripId, wrongTripId, status: statusReqBody, invalidToken
} = rejectTrip;

const tripUrl = '/api/v1/trips/manager/request';
let correctTestToken = null;
let wrongTestToken = null;
let correctTokenWrongTrip = null;


describe('PUT Reject Trip request by Manager Endpoint', () => {
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
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(correctRequester)
      .end((err, res) => {
        if (err) return done(err);
        wrongTestToken = res.body.data.token;
        return done();
      });
  });

  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(correctManagerWrongTrip)
      .end((err, res) => {
        if (err) return done(err);
        correctTokenWrongTrip = res.body.data.token;
        return done();
      });
  });
  it('should return 200, correctly edit trip status and return user travel history', done => {
    try {
      chai
        .request(server)
        .put(`${tripUrl}/${correctTripId}`)
        .set('Authorization', `Bearer ${correctTestToken}`)
        .send(statusReqBody)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(200);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('data');
          const { status, data } = body;

          expect(status).to.deep.equal('success, Trip Status Changed');
          expect(data).to.be.an('object');

          expect(data).to.have.property('tripId');
          expect(data).to.have.property('tripType');
          expect(data).to.have.property('origin');
          expect(data).to.have.property('destinations');
          expect(data).to.have.property('departureDate');
          expect(data).to.have.property('returnDate');
          expect(data).to.have.property('reason');
          expect(data).to.have.property('requestStatus');
          expect(data).to.have.property('createdAt');

          const {
            tripId,
            tripType,
            origin,
            destinations,
            departureDate,
            reason,
            requestStatus,
            createdAt
          } = data;

          expect(tripId).to.be.a('string');
          expect(tripType).to.be.a('string');
          expect(origin).to.be.an('object');
          expect(destinations).to.be.an('array');
          expect(departureDate).to.be.a('string');
          expect(reason).to.be.a('string');
          expect(createdAt).to.be.a('string');
          expect(requestStatus).to.be.a('string');
          expect(requestStatus).to.equal('rejected');

          expect(origin).to.have.property('locationId');
          expect(origin).to.have.property('locationName');
          expect(origin).to.have.property('locationAddress');

          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });

  it('should return 401 for Invalid Token', done => {
    try {
      chai
        .request(server)
        .put(`${tripUrl}/${correctTripId}`)
        .set('Authorization', `Bearer ${invalidToken}`)
        .send(statusReqBody)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(401);
          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');
          const { status, error } = body;
          expect(status).to.deep.equal(401);
          expect(status).to.be.a('number');
          expect(error).to.deep.equal('Authorization Denied.');
          expect(error).to.be.a('string');
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });

  it('should return 401 for non manager', done => {
    try {
      chai
        .request(server)
        .put(`${tripUrl}/${correctTripId}`)
        .set('Authorization', `Bearer ${wrongTestToken}`)
        .send(statusReqBody)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(403);
          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('message');
          const { status, message } = body;
          expect(status).to.deep.equal('error');
          expect(status).to.be.a('string');
          expect(message).to.deep.equal('Forbidden. You do not have authorization rights');
          expect(message).to.be.a('string');
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });

  it('should return 404 for trips that do not exist', done => {
    try {
      chai
        .request(server)
        .put(`${tripUrl}/${wrongTripId}`)
        .set('Authorization', `Bearer ${correctTestToken}`)
        .send(statusReqBody)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(404);
          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');
          const { status, error } = body;
          expect(status).to.deep.equal('error');
          expect(status).to.be.a('string');
          expect(error).to.deep.equal(`Cannot Find Trip With Id: ${wrongTripId}`);
          expect(error).to.be.a('string');
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });

  it('should return 404 for trips that do not exist', done => {
    try {
      chai
        .request(server)
        .put(`${tripUrl}/${correctTripId}`)
        .set('Authorization', `Bearer ${correctTokenWrongTrip}`)
        .send(statusReqBody)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(403);
          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');
          const { status, error } = body;
          expect(status).to.deep.equal('error');
          expect(status).to.be.a('string');
          expect(error).to.deep.equal(`Unauthorized Request, You cannot change the status of this trip with id: ${correctTripId}`);
          expect(error).to.be.a('string');
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
});
