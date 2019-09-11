import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);
let token = null;


describe('Testing User Comment On Travel Request ', () => {
    it('should login a user account on /login POST ', (done) => {
        chai.request(server)
            .post('/api/v1/auth/login')
            .send({
                email: 'stephenibaba@andela.com',
                password: 'Jennylove19'
            })
            .end((err, res) => {
                if (err) return done(err);
                token = res.body.data.token;
                expect(res.status).to.equal(200);
                expect(res.body.data).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body.message).to.equal('User successfully logged in');
                done();
            });
    });
   
    it('should post new multi city trip request to the database', (done) => {
        chai.request(server)
            .post('/api/v1/trips/request')
            .set('Authorization', `Bearer ${token}`)
            .send({
                departureDate: '2019-10-10',
                returnDate: '2019-12-10',
                currentOfficeLocation: 1,
                reason: 'official',
                tripType: 'Multi-city',
                destination: [2, 3]
            })
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.haveOwnProperty('status');
                expect(res.status).to.equal(201);
                expect((res.body)).to.be.an('object');
                expect((res.body)).to.have.all.keys('status', 'data');
                expect((res.body)).to.haveOwnProperty('status').that.equals('success');
                expect((res.body)).to.haveOwnProperty('status').that.is.a('string');
                expect((res.body)).to.haveOwnProperty('data').that.is.an('object');
                expect((res.body.data)).to.be.an('object');
                expect((res.body.data.userId)).to.be.a('string');
                expect((res.body.data.destinationIDs)).to.be.an('array');
                expect((res.body.data.currentOfficeLocation)).to.be.an('array');
                expect((res.body.data.destinations)).to.be.an('array');
                expect((res.body.data.departureDate)).to.be.a('string');
                expect((res.body.data.returnDate)).to.be.a('string');
                expect((res.body.data.reason)).to.be.a('string');
                expect((res.body.data.tripType)).to.be.a('string');
                expect((res.body.data.requestStatus)).to.be.a('string');
                expect((res.body.data.requestStatus)).to.equals('pending');
                done();
            });
    });
    describe('Testing User Create Comment On Travel Request ', () => {
        it('should post a new comment on a trip request', (done) => {
            chai.request(server)
                .post('/api/v1/trips/request/comment')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    comment: 'will be going to dubia on partner engagement'
                })
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.haveOwnProperty('status');
                    expect(res.status).to.equal(201);
                    expect((res.body)).to.be.an('object');
                    expect((res.body)).to.have.all.keys('status', 'message', 'data');
                    expect((res.body)).to.haveOwnProperty('data').that.is.an('object');
                    expect((res.body.data.userId)).to.be.a('string');
                    expect((res.body.data.tripId)).to.be.a('string');
                    expect((res.body.data.comment)).to.be.a('string');
                    done();
                });
        });
       
        it('should return a 401 if the token is not a Bearer type token', (done) => {
            chai.request(server)
                .delete('/api/v1/trips/request/comment/1')
                .set('Authorization', `${token}`)
                .send({
                    comment: 'will be going to dubia on partner engagement'
                })
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.haveOwnProperty('status');
                    expect(res.status).to.equal(401);
                    done();
                });
        });
        it('should return a 404 for an invalid route', (done) => {
            chai.request(server)
                .post('/api/v1/trips/request/comments')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    comment: 'will be going to dubia on partner engagement'
                })
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(404);
                    expect((res.body)).to.be.an('object');
                    expect((res.body)).to.have.all.keys('message');
                    done();
                });
        });
    });
   
    describe('###Testing User Delete Comment On Travel Request ', () => {
        it('should delete the comment on travel request', (done) => {
            chai.request(server)
                .delete(`/api/v1/trips/request/comment/${1}`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.haveOwnProperty('status');
                    expect(res.status).to.equal(200);
                    expect((res.body)).to.be.an('object');
                    expect((res.body)).to.have.all.keys('status', 'message');
                   
                    done();
                });
        });
            it('should return a 404 for an invalid id', (done) => {
                chai.request(server)
                    .delete(`/api/v1/trips/request/comment/${20}`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.status).to.equal(404);
                        expect(res.body).to.haveOwnProperty('status');
                        expect((res.body)).to.be.an('object');
                        expect(res.body).to.haveOwnProperty('error');
                        done();
                    });
            });
        it('should return a 400 Param must be an Integer', (done) => {
                chai.request(server)
                    .delete(`/api/v1/trips/request/comment/${'sdfgh'}`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.statusCode).to.equal(400);
                        expect(res.body).to.be.a("object");
                        done();
                    });
        });
        
        it('should return a 400 unauthorized user', (done) => {
            chai.request(server)
                .delete(`/api/v1/trips/request/comment/${1}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(401);
                    done();
                });
        });
    });
   
});

