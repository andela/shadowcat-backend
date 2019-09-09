import express from 'express';
import apiRouter from './api';

const index = express.Router();

const mainIndexRoute = (io = null) => index.use('/api', apiRouter(io));

export default mainIndexRoute;
