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
      console.log(idManager, 'id from req middleware');
      const theUser = await Users.findOne({
        where: { userId: idManager },
        raw: true
      });
      console.log(theUser, 'manager User from middleware');
      const { id } = theUser;
      console.log(id, 'from db in middleware');
      console.log(id, 'from token in middleware');
      req.lineManagerId = id;
      return next();
    } catch (error) {
      return res.status(500).json(errorResponse('Internal Server Error'));
    }
  }
}

export default managerHelp;
