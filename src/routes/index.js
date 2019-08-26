import express from 'express';
import apiRouter from './api/passwordResetRoute';

const index = express.Router();

index.use('/api/v1/users', apiRouter);

export default index;
