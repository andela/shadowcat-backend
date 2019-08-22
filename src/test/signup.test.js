import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import user from './__MOCK__/user';
import server from '../index';
import { signupErrors } from '../utils/constants/errorMessages';
import models from '../models';

chai.use(chaiHttp);
const url = '/api/v1/auth/signup';
let createdUserId = null;

describe('POST signup route', () => {
  after(async () => {
    const { User } = models;
    await User.destroy({
      where: {
        user_id: createdUserId
      }
    });
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
          expect(res.status).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(400);
          expect(error).to.equal(signupErrors.undefinedFirstName);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 400 with invalid first name', (done) => {
    const cloneUser = { ...user };
    cloneUser.firstName = 'anny5';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(400);
          expect(error).to.equal(signupErrors.invalidFirstName);
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
          expect(res.status).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(400);
          expect(error).to.equal(signupErrors.undefinedLastName);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });

  it('should return 400 with invalid last name', (done) => {
    const cloneUser = { ...user };
    cloneUser.lastName = 'anny5';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(400);
          expect(error).to.equal(signupErrors.invalidLastName);
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
          expect(res.status).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(400);
          expect(error).to.equal(signupErrors.undefinedPhone);
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
          expect(res.status).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(400);
          expect(error).to.equal(signupErrors.invalidPhone);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 400 with invalid password', (done) => {
    const cloneUser = { ...user };
    cloneUser.password = 'toshort';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(400);

          expect(error).to.equal(signupErrors.invalidPassword);
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
          expect(res.status).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(400);

          expect(error).to.equal(signupErrors.invalidEmail);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 400 with non andela email', (done) => {
    const cloneUser = { ...user };
    cloneUser.email = 'anifowosehabeeb@gmail.com';
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(400);

          const { body } = res;
          expect(body).to.have.property('status');
          expect(body).to.have.property('error');

          const { status, error } = body;
          expect(status).to.deep.equal(400);

          expect(error).to.equal(signupErrors.nonAndelanEmail);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
  it('should return 201 with valid data', (done) => {
    const cloneUser = { ...user };
    try {
      chai
        .request(server)
        .post(`${url}`)
        .send(cloneUser)
        .end((err, res) => {
          expect(res).to.have.property('status');
          expect(res).to.have.property('body');
          expect(res.status).to.deep.equal(201);

          const { body } = res;

          expect(body).to.have.property('status');
          expect(body).to.have.property('data');

          const { status, data } = body;
          expect(status).to.deep.equal(201);

          expect(data).to.be.an('object');
          expect(data).to.have.property('user_id');
          expect(data).to.have.property('first_name');
          expect(data).to.have.property('last_name');
          expect(data).to.have.property('email');
          expect(data).to.have.property('phone');
          expect(data).to.have.property('active');
          expect(data).to.have.property('created_at');

          const firstName = data.first_name;
          const lastName = data.last_name;
          const {
            email, phone, active
          } = data;

          createdUserId = data.user_id;
          expect(firstName).to.equal(user.firstName);
          expect(lastName).to.equal(user.lastName);
          expect(email).to.equal(user.email);
          expect(phone).to.equal(user.phone);
          expect(active).to.equal(false);
          done();
        });
    } catch (err) {
      expect(err).to.have.status(500);
    }
  });
});
