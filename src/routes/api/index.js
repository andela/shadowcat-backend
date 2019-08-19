import express from 'express';
import authRouter from './auth';

const index = express.Router();

index.use('/v1/auth', authRouter);

export default index;
