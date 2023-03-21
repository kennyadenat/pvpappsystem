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
  static async NewSupportConversation(req, res) {

    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = sendinblue_api;

    const urls = `${FRONTEND_URL_EMAIL_VERIFICATION}?email=${email}&token=${verifyToken}`;

    const contents = ``;

    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      'subject': req.body.title,
      'sender': {
        'email': 'pvpofficeng@gmail.com',
        'name': 'Plant Variety Protection Office'
      },
      'replyTo': {
        'email': 'pvpofficeng@gmail.com',
        'name': 'Plant Variety Protection Office'
      },
      'to': [{
        'name': `${req.body.fullname}`,
        'email': `${req.body.email}`
      }],
      'htmlContent': `${contents}`
    }).then((data) => {
      // return next({
      //   success: data
      // });
    }, (error) => {
      // return next({
      //   err: error
      // });
    });

  }

}

module.exports = EmailHelper;