require('dotenv').config();
const postEmail = require('./postEmail');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const {
  url
} = require('gravatar');


const {
  FRONTEND_URL_EMAIL_VERIFICATION,
  FRONTEND_URL_PASSWORD_RESET,
  FRONTEND_URL_NOMINATE_AGENT,
  APP_LOGO,
  sender_email,
  sendinblue_api
} = process.env;

const {
  SendEmail
} = postEmail;


/**
 * @exports
 * @class EmailVerification
 */
class EmailHelper {

  /**
   *
   * @static   
   * @param {string} email - recipient of the email
   * @param {string} firstname - name of the recipient
   * @param {string} verifyToken - verification token
   * @memberof NewSupportConversation
   * @returns {function} - returns a function call
   */
  static async NewSupportConversation(req) {}

}

module.exports = EmailHelper;