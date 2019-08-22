import General from './index';

/**
 * A class for generating API responses
 */
class ResponseGenerator {
  /**
   * Send Success message.
   * @param {object} res The first arrgv.
   * @param {number} statusCode The second number.
   * @param {object} data The data received.
   * @returns {object} The sum of the two numbers.
   */
  constructor() {
    this.status = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  /**
   * Send Success message.
   * @param {object} res The first arrgv.
   * @param {number} statusCode The second number.
   * @param {object} data The data received.
   * @returns {object} The sum of the two numbers.
   */
  sendSuccess(res, statusCode, data) {
    this.status = statusCode;
    this.data = data;
    this.type = 'success';
    return this.send(res);
  }

  /**
   * Send Error message.
   * @param {object} res The first arrgv.
   * @param {number} statusCode The second number.
   * @param {string} message the message returned.
   * @returns {object} The sum of the two numbers.
   */
  sendError(res, statusCode, message) {
    this.status = statusCode;
    this.message = message;
    this.type = 'error';

    return this.send(res);
  }

  /**
   * Sends response
   * @param {object} res
   * @returns {object} response
   */
  send(res) {
    const filteredResponse = General.stripNull({
      status: this.status,
      data: this.data
    });

    if (this.type === 'success') {
      return res.status(this.status).json(filteredResponse);
    }
    return res.status(this.status).json({
      status: this.status,
      error: this.message
    });
  }
}

export default ResponseGenerator;
