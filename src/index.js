<<<<<<< HEAD
import fs from 'fs';
import http from 'http';
import path from 'path';
import methods from 'methods';
=======
import './models/User';
>>>>>>> staging
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
<<<<<<< HEAD
import passport from 'passport';
=======
>>>>>>> staging
import errorhandler from 'errorhandler';
import mongoose from 'mongoose';
import morgan from 'morgan';
import methodOverride from 'method-override';
<<<<<<< HEAD
import './models/User';
import route from './routes';
import envVariables from './config';

const { port } = envVariables;

=======
import apiRoutes from './routes';
>>>>>>> staging

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
<<<<<<< HEAD
app.use('morgan')('dev');
=======
app.use(morgan('dev'));
>>>>>>> staging

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

<<<<<<< HEAD
app.use('methodOverride')();
=======
app.use(methodOverride());
>>>>>>> staging

app.use(express.static(`${__dirname}/public`));

app.use(
  session({
    secret: 'authorshaven',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorhandler());
}

if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/conduit');
  mongoose.set('debug', true);
}

<<<<<<< HEAD
app.use(route);
=======
app.use(apiRoutes);
>>>>>>> staging

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
<<<<<<< HEAD
  app.use((err, req, res, next) => {
=======
  app.use((err, req, res) => {
>>>>>>> staging
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
<<<<<<< HEAD
app.use((err, req, res, next) => {
=======
app.use((err, req, res) => {
>>>>>>> staging
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
<<<<<<< HEAD
const server = app.listen(port || 3000, () => {
=======
const server = app.listen(process.env.PORT || 3000, () => {
>>>>>>> staging
  console.log(`Listening on port ${server.address().port}`);
});
