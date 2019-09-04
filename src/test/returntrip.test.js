import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import uuidv4 from 'uuidv4';
import ReturnTrip from '../controllers/returnTrip';
//import  { should } from 'chai';
import Token from './__MOCK__/Tokens';

const { expect } = chai;
chai.use(chaiHttp);
// const { Token } = tokens;


describe('Testing ReturnTrip Endpoints', () => {
    it('Return Trip Controller should exist', () => {
        ReturnTrip.should.exist;
    });

    it('ReturnTripRequest method (POST) should exist', () => {
        ReturnTrip.returnTripRequest.should.exist;
    });

    it('ReturnTripRequest method (POST) should create a Return Trip', (done) => {
        chai.request(server)
            .post('/api/v1/trips/request')
            .set("Authorization", Token)
            .send({
                currentOfficeLocation: 'abuja',
                tripId: uuidv4(),
                userId: '567',
                departureDate: '2019-09-12',
                returnDate: '2019-09-26',
                accomodation: 'transcop',
                reason: 'Holiday',
                tripType: 'Return-trip',
                requestStatus: 'pending',
                destination: 'Lagos',
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.should.be.a('object');
                res.body.data.should.be.have.property('userId');
                res.body.data.should.be.have.property('destination');
                res.body.data.should.be.have.property('currentOfficeLocation');
                res.body.data.should.be.have.property('departureDate');
                res.body.data.should.be.have.property('returnDate');
                res.body.data.should.be.have.property('reason');
                res.body.data.should.be.have.property('tripType');
                res.body.data.should.be.have.property('requestStatus');
            });
        done();
    });
    
});