import { Router } from 'express';
import RequestComment from '../../controllers/comments';
import Authentication from '../../middlewares/auth';


const commentRoute = Router();

commentRoute.post('/comment', Authentication.authenticate, RequestComment.createComment);
commentRoute.put('/comment/:commentId', Authentication.authenticate, RequestComment.updateComment);
commentRoute.get('/comment', Authentication.authenticate, RequestComment.getComment);

export default commentRoute;
