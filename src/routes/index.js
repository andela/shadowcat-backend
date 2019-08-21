import express from 'express';
import apiRouter from './api';

const index = express.Router();

index.use('/api/v1/users', apiRouter);

export default index;
