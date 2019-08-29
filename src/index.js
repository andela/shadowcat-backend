import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import passport from 'passport';
import swaggerDocument from '../public/api-docs/swagger.json';
import './models/user';
import apiRoutes from './routes';
import Authentication from './middlewares/auth';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(methodOverride());

app.use(express.static(`${__dirname}/public`));
app.use(passport.initialize());
app.use(passport.session());


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorhandler());
}
app.use(apiRoutes);

// testing route
app.get('/', (req, res) => {
  res.send("Welcome to Barefoot Nomad Endpoints' Page");
});
app.post('/signup', (req, res) => {
  const token = Authentication.signJwt({ user_id: 2345, is_admin: false });
  res.status(200).send({
    status: 200,
    data: [
      { token }
    ]
  });
});
// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;

// finally, let's start our server...
const server = app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default server;
