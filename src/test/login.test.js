import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('User login', () => {
  
  it('should login a user account on /login POST ', (done) => {
    chai.request(server)
    .post('/api/auth/login')
    .send({
      email: 'chimamark@example.com',
      password: 'Chibyke8%'
    })
    .end((err, res) => {
      expect(res.status).to.equal(201);
      expect(res.body.payload).to.be.an('object');
      expect(res.body).to.have.property('status');
      expect(res.body.message).to.equal('User successfully logged in');
      done();
    });
});

it('should return an invalid login', (done) => {
  chai.request(server)
      .post('/api/auth/login')
      .send({
        email: 'chimamark@example.com',
        password: '1234d567'
      })
  .end((err, res) => {
    expect(res.status).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body.message).to.equal('Invalid email or password');
    done();
  });
  })
});
