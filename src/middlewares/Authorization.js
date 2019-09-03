import auth from "../utils/Token";


/**
 * @exports
 * @class Authorization
 */
class Authorization {

    /**
     * Authenticate user
     * @method authenticate
     * @memberof Authorization
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {(function|object)} Function next() or JSON object
     */
    static async authenticate(req, res, next) {
        try {
            const { authorization } = req.headers;
            const token = authorization.split(' ')[1];

            const decoded = await auth.verifyToken(token);

            req.user = decoded;

            return next();
        } catch (err) {
            console.log(err)
            return res.status(401).json({
                status: 'error',
                message: 'Token is invalid or not provided'
            })
        }
    }
}

export default Authorization;
