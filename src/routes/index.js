import express from 'express';
import apiRouter from './api';

const index = express.Router();

const foo = (io = null) => index.use('/api', apiRouter(io));

export default foo;
