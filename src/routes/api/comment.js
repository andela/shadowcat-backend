import { Router } from 'express';
import Comment from '../../controllers/comment';
import Authentication from '../../middlewares/auth';
import commentValidation from '../../validation/commentValidation';
import VerifyUser from '../../middlewares/userId';

const commentRoute = Router();

commentRoute.post('/comment/:requestId', commentValidation, Authentication.authenticate, Comment.createComment);
commentRoute.put('/comment/:commentId', commentValidation, Authentication.authenticate, VerifyUser.verifyUserId, Comment.updateComment);
commentRoute.get('/comment/:requestId', Authentication.authenticate, Comment.getComment);

export default commentRoute;
