import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const tokenSecret = process.env.SECRET || 'secret';
const tokenExpiration = process.env.TOKEN_EXPIRE || '1d';

/**
 * @class Token
 */
class Token {
  /**
   * @static
   * @param {payload} payload object
   * @returns {string} returns the token
   * @memberof Token
   */
  static async create(payload) {
    const token = await jwt.sign(payload, tokenSecret, {
      expiresIn: tokenExpiration
    });
    return token;
  }
}