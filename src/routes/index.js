import express from 'express';
import apiRouter from './api';

const mainRoute = express.Router();

mainRoute.use('/api', apiRouter);

export default mainRoute;
