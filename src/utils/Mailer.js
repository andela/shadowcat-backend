
import dotenv from 'dotenv';
import emailer from '@sendgrid/mail';

dotenv.config();
/**
 *
 *
 * @class PasswordEmail
 */
class PasswordEmail {
  /** @static
   *
   *
   * @static
   * @param {props} userEmail
   * @param {email} template
   * @returns{object} Success Message
   * @memberof PasswordEmail
   */
  static async sendEmail(userEmail, template) {
    emailer.setApiKey(process.env.SENDGRID_API_KEY);

    const detail = {

      to: userEmail,
      from: { email: process.env.WEB_MAIL_URL, name: 'BareFoot Nomad' },
      subject: 'Reset Password',
      html: template,
    };

    try {
      await emailer.send(detail);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default PasswordEmail;
