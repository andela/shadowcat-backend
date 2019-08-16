<<<<<<< HEAD
import { Router } from 'express';

const router = Router();

router.use('/api', require('./api'));
=======
import express from 'express';
import apiRouter from './api';

const index = express.Router();
>>>>>>> staging

index.use('/api', apiRouter);

export default index;
