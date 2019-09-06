import express from 'express';
import { Trips } from '../../controllers';
import { Authentication } from '../../middlewares';
import { multicityCheck, validateInput } from '../../validation';
import CommentController from '../../controllers/commentController';

const { multiCityRequest } = Trips;
const { authenticate } = Authentication;


const router = express.Router();

router.post('/request', authenticate, multicityCheck, validateInput, multiCityRequest);
router.post('/request/comments',  CommentController.create);
router.delete("/request/comments/:id", authenticate, CommentController.deleteComment);
export default router;
