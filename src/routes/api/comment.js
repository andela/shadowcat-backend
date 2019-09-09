import { Router } from 'express';
import RequestComment from '../../controllers/comments';
import Authentication from '../../middlewares/auth';
import commentValidation from '../../validation/commentValidation';


const commentRoute = Router();

commentRoute.post('/comment', commentValidation, Authentication.authenticate, RequestComment.createComment);
commentRoute.put('/comment/:commentId', commentValidation, Authentication.authenticate, RequestComment.updateComment);
commentRoute.get('/comment', Authentication.authenticate, RequestComment.getComment);

export default commentRoute;
