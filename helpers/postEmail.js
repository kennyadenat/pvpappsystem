require('dotenv').config();

/**
 * Configure to Use any of the Preferred Mail Server
 * SendGrid, Nexmo
 */


/**
 * @exports
 * @class PostEmail
 */
class PostEmail {

  /**
   * @static   
   * @param {string} recipient - recipient of the email
   * @param {string} sender - sender of the email
   * @param {string} subject - verification token
   * @param {string} content = content of the email address
   * @returns {function} returns a function
   * @memberof PostEmail
   */
  static async SendEmail(recipient, sender, subject, content) {

  }
}

module.exports = PostEmail;