/**
 *
 *
 * @class Response
 */
class Response {
  /**
   *
   *
   * @static
   * @param {String} msg
   * @param {Object} responseData
   * @returns{Object} Message
   * @memberof Response
   */
  static successResponse(msg, responseData) {
    return {
      status: msg,
      data: responseData,
    };
  }

  /**
   *
   *
   * @static
   * @param {String} messageData
   * @returns{Object} Message
   * @memberof Response
   */
  static messageResponse(messageData) {
    return {
      message: messageData,
    };
  }

  /**
 *
 *
 * @static
 * @param {String} responseError
 * @returns{Object} Message
 * @memberof Response
 */
  static errorResponse(responseError) {
    return {
      status: 'error',
      error: responseError,
    };
  }
}

export default Response;
