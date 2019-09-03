import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);


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
            .send({
                currentOfficeLocation: '',
                tripId: uuidv4(),
                user_id: '',
                departureDate: new Date(departureDate).toUTCString(),
                returnDate: new Date(returnDate).toUTCString(),
                accomodation: '',
                reason: '',
                tripType: '',
                requestStatus: 'pending',
                destination: '',
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.be.have.property('data');
                res.body.data.should.be.a('object');
                res.body.data.should.be.have.property('user_id');
                res.body.data.should.be.have.property('destination');
                res.body.data.should.be.have.property('current_office_location');
                res.body.data.should.be.have.property('departure_date');
                res.body.data.should.be.have.property('return_date');
                res.body.data.should.be.have.property('reason');
                res.body.data.should.be.have.property('tripType');
                res.body.data.should.be.have.property('requestStatus');
            });
        done();
    });
});