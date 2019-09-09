import { Router } from 'express';
import Comment from '../../controllers/comment';
import Authentication from '../../middlewares/auth';
import commentValidation from '../../validation/commentValidation';


const commentRoute = Router();

commentRoute.post('/comment', commentValidation, Authentication.authenticate, Comment.createComment);
commentRoute.put('/comment/:commentId', commentValidation, Authentication.authenticate, Comment.updateComment);
commentRoute.get('/comment', Authentication.authenticate, Comment.getComment);

export default commentRoute;
