import models from '../models';
import validateParam from '../utils/validateParams';




const { Comment } = models;

/**
 * @exports CommentController
 * @class CommentController
 * @description Handles the comment section
 */
class CommentController {
    /**
     * Create new comment
     * @static
     * @param {object} req - The Request Object
     * @param {object} res - The Response Object
     * @param {object} next - The Next Middleware
     * @return {json} - Returns json Object
     * @memberof CommentController
     * @static
     */
    static async create(req, res,) {
        try {
            
            //const body = data.comment;
            //const { tripId } = req.params;
            //const userId = req.decoded.id;
            //const { tripId } = req;

            await tripId.createComment({ tripId, userId, body });

            const payload = await comments(tripId);

            return res.status(201).json({
                status: 201,
                message: 'you have successfully created a comment'
            });
        } catch (error) {
                return res.status(400).json({
                    status: 400,
                    errors: 'No comments created'
                });
            
        }
    }

   
   

    static async deleteComment(req, res, next) {
        try {
            validateParam(res, req.params.id);
            const { id } = req.params;
            
           
            const comment = await Comment.findOne({where: {id}});
           
            if (!comment) {
                return res.status(404).json({
                    status: res.statusCode,
                    error: 'Comment Not Found',
                });
            }
            await Comment.destroy({ where: { id }});
            return res.status(200).json({
                status: "success",
                message: "Your comment has been Sucessfully Deleted"
            });
        } catch (error) {
            next(error);
        }
    }

   
}

export default CommentController;
