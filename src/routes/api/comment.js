import { Router } from 'express';
import Comment from '../../controllers/comment';
import Authentication from '../../middlewares/auth';



const commentRoute = Router();

commentRoute.post('/comment', Authentication.authenticate, Comment.createComment);
commentRoute.get('/comment', Authentication.authenticate, Comment.getComment);
commentRoute.delete('/comment/:commentId', Authentication.authenticate, Comment.deleteComment);

export default commentRoute;