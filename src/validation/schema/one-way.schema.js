import Joi from '@hapi/joi';

const date = Joi.date();

const string = Joi.string().regex(/^\D+$/);

const oneWayRequest = Joi.object({
  origin: Joi.number()
    .positive()
    .allow(0)
    .precision(1)
    .required(),
  destination: Joi.number()
    .positive()
    .allow(0)
    .precision(1)
    .required(),
  travel_reasons: string
    .error(new Error('travel_reasons is required and must be strings'))
    .required(),
  accomodation: string
    .error(new Error('accommodation is required and must be a string'))
    .required(),
  departure_date: date
    .error(new Error('departure_date is required'))
    .required(),
  type: string.valid('one-way', 'return', 'multiple-cities').default('one-way', {
    invalid: true
  })
});

export default {
  '/trips/requests': oneWayRequest
};
