
/**

@description class description
@Class className
*/
class Logout {
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Logout
   */
  static async logout(req, res, next) {
    try {
      if (req.session.userId) {
        req.logout();

        req.session = null;
      }

      // return res.redirect('/api/v1/auth/login');
      return res.status(200).json({
        status: res.statusCode,
        message: 'you have logged out successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}


export default Logout;
