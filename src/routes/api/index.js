<<<<<<< HEAD
const router = require('express').Router();

router.use('/', require('./users'));

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }

=======
import express from 'express';
import usersRouter from './users';

const index = express.Router();

index.use('/', usersRouter);

index.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }

>>>>>>> staging
  return next(err);
});

export default index;
