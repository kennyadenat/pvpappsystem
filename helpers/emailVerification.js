require('dotenv').config();
const postEmail = require('./postEmail');

const {
  FRONTEND_URL_EMAIL_VERIFICATION,
  APP_LOGO,
  sender_email
} = process.env;

const {
  SendEmail
} = postEmail;


/**
 * @exports
 * @class EmailVerification
 */
class EmailVerification {

  /**
   *
   * @static   
   * @param {string} email - recipient of the email
   * @param {string} firstname - name of the recipient
   * @param {string} verifyToken - verification token
   * @memberof EmailVerification
   * @returns {function} - returns a function call
   */
  static async sendEmailVerification(email, firstname, verifyToken) {

    const content = `<img src=${APP_LOGO}>
                    <br><h1>Welcome ${firstname}</h1><br>
                    <h2>Please click the link below to confirm your email</h2><br>
                    <h2> <a href = '${FRONTEND_URL_EMAIL_VERIFICATION}?email=${email}&token=${verifyToken}'> Confirm Email </a></h2>`;

    SendEmail(
      email,
      sender_email,
      'Welcome to National Agricultural Seeds Council',
      content
    );

  }
}


module.exports = EmailVerification;