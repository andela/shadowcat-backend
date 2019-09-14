import Model from '../../models';
import response from '../Response';

const { Users } = Model;
const { errorResponse } = response;

/**
 *
 *
 * @class managerHelp
 */
class managerHelp {
  /**
  *
  *
  * @static
  * @param {Object} req
  * @param {Object} res
  * @param {Method} next
  * @returns{Object}User
  * @memberof managerHelp
  */
  static async getManagerId(req, res, next) {
    try {
      const { id: idManager } = req;
      const theUser = await Users.findOne({
        where: { userId: idManager },
        raw: true
      });
      const { id } = theUser;
      req.lineManagerId = id;
      return next();
    } catch (error) {
      return res.status(500).json(errorResponse('Internal Server Error'));
    }
  }
}

export default managerHelp;
