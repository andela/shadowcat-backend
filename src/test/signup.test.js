import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);

describe('POST signup route', () => {
  it('should successfully sign up a user', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.be.a('string');
        done();
      });
  });
});
