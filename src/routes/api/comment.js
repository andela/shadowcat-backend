import { Router } from 'express';
import Comment from '../../controllers/comment';
import Authentication from '../../middlewares/auth';



const commentRoute = Router();

commentRoute.post('/comment', Authentication.authenticate, Comment.createComment);
commentRoute.put('/comment/:commentId',  Authentication.authenticate, Comment.updateComment);
commentRoute.get('/comment', Authentication.authenticate, Comment.getComment);
commentRoute.delete("/comment/:id", Authentication.authenticate, Comment.deleteComment);

export default commentRoute;