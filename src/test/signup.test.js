import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import user from './__MOCK__/user';
import server from '../index';
import { signupErrors } from '../utils/constants/errorMessages';

chai.use(chaiHttp);
const url = '/api/v1/auth/signup';

describe('POST signup route', () => {
  it('should return 400 with empty body parameters', (done) => {
    try {
      chai.request(server)
        .post(`${url}`)
        .send({})
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('errors');

          const { status, errors } = body;
          expect(status).to.deep.equal(400);
          expect(errors).to.be.an('array');
          expect(errors[0]).to.equal(signupErrors.undefinedFirstName);
          expect(errors[1]).to.equal(signupErrors.undefinedLastName);
          expect(errors[2]).to.equal(signupErrors.undefinedEmail);
          expect(errors[3]).to.equal(signupErrors.undefinedPhone);
          expect(errors[4]).to.equal(signupErrors.undefinedPassword);
          expect(errors[5]).to.equal(signupErrors.invalidEmail);
          expect(errors[6]).to.equal(signupErrors.invalidPhone);
          expect(errors[7]).to.equal(signupErrors.invalidPassword);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 400 with undefined first name', (done) => {
    const cloneUser = { ...user };
    cloneUser.firstName = '';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('errors');

          const { status, errors } = body;
          expect(status).to.deep.equal(400);
          expect(errors).to.be.an('array');
          expect(errors[0]).to.equal(signupErrors.undefinedFirstName);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 400 with undefined last name', (done) => {
    const cloneUser = { ...user };
    cloneUser.lastName = '';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('errors');

          const { status, errors } = body;
          expect(status).to.deep.equal(400);
          expect(errors).to.be.an('array');
          expect(errors[0]).to.equal(signupErrors.undefinedLastName);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 400 with undefined phone', (done) => {
    const cloneUser = { ...user };
    cloneUser.phone = '';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('errors');

          const { status, errors } = body;
          expect(status).to.deep.equal(400);
          expect(errors).to.be.an('array');
          expect(errors[0]).to.equal(signupErrors.undefinedPhone);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 400 with invalid phone', (done) => {
    const cloneUser = { ...user };
    cloneUser.phone = 'lad091';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('errors');

          const { status, errors } = body;
          expect(status).to.deep.equal(400);
          expect(errors).to.be.an('array');
          expect(errors[0]).to.equal(signupErrors.invalidPhone);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 400 with invalid password', (done) => {
    const cloneUser = { ...user };
    cloneUser.password = 'tooshort';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('errors');

          const { status, errors } = body;
          expect(status).to.deep.equal(400);
          expect(errors).to.be.an('array');
          expect(errors[0]).to.equal(signupErrors.invalidPassword);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 400 with invalid email', (done) => {
    const cloneUser = { ...user };
    cloneUser.email = 'anifowosegmail';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('errors');

          const { status, errors } = body;
          expect(status).to.deep.equal(400);
          expect(errors).to.be.an('array');
          expect(errors[0]).to.equal(signupErrors.invalidEmail);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 400 with non andelan email', (done) => {
    const cloneUser = { ...user };
    cloneUser.email = 'anifowosehabeeb@gmail';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('errors');

          const { status, errors } = body;
          expect(status).to.deep.equal(400);
          expect(errors).to.be.an('array');
          expect(errors[0]).to.equal(signupErrors.nonAndelanEmail);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 201 with invalid email', (done) => {
    const cloneUser = { ...user };
    cloneUser.email = 'anifowosegmail';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res).to.deep.equal(200);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('data');

          const { status, data } = body;
          expect(status).to.deep.equal(400);

          expect(data).to.be.an('object');
          expect(data).to.have.property('token');
          expect(data).to.have.property('first_name');
          expect(data).to.have.property('last_name');
          expect(data).to.have.property('email');
          expect(data).to.have.property('password');
          expect(data).to.have.property('phone');

          const firstName = data.first_name;
          const lastName = data.last_name;
          const {
            email, phone
          } = data;

          expect(firstName).to.equal(user.firstName);
          expect(lastName).to.equal(user.firstName);
          expect(email).to.equal(user.email);
          expect(phone).to.equal(user.phone);

          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
});
