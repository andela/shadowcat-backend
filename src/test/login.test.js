import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('User login', () => {
  it('should login a user account on /login POST ', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'chimamark@andela.com',
        password: 'Chibyke8%'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.payload).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('User successfully logged in');
        done();
      });
  });

  it('should return an invalid login when the password or email is incorrect', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'chimamark@andela.com',
        password: 'chibyke'
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Invalid email or password');
        done();
      });
  });
});
