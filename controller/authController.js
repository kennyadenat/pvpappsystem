const models = require('../models');
const serverResponse = require('../modules/serverResponse');
const authHelper = require('../helpers/authHelper');
const emailHelper = require('../helpers/emailVerification');
require('dotenv').config();

const {
  sendEmailVerification
} = emailHelper;

const {
  authors
} = models;

const {
  createToken,
  hashPassword,
  hashUserData
} = authHelper;

const {
  successResponse,
  errorResponse
} = serverResponse;

const authorAttributes = ['id', 'email', 'firstname', 'lastname',
  'role', 'avatar',
]

/**
 * @export
 * @class AuthController
 */
class AuthController {

  /**
   * @static
   * Returns user signin object
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} returns author signup object
   * @memberof AuthController
   */
  static async signUp(req, res, next) {

    try {
      const {
        email,
        firstname,
        lastname,
        password
      } = req.body;

      const hashedPassword = await hashPassword(password);

      // Generate Email Verifiation Token
      const verifyToken = await hashUserData(email);

      // Send Email Verification to User to Confirm Email Address
      sendEmailVerification(email, firstname, verifyToken);

      const newUser = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        avatar: 'http://res.cloudinary.com/dgniwrwip/image/upload/v1584245342/tqrfdrdjbtwrhokpbb1r.jpg'
      };

      const token = await createToken(newUser);

      newUser.password = hashedPassword;
      newUser.token = verifyToken;
      // create the user after sending the verification email

      return authors
        .create(newUser)
        .then(newAuthor => {
          successResponse(res, 201, 'authors', newAuthor);
        })
        .catch(error => {
          errorResponse(res, 400, {
            message: error
          });
        });


    } catch (error) {
      return next(error);
    }
  }


  /**
   * @static
   * Returns user signin object
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} returns user signin object
   * @memberof AuthController
   */
  static async verifyEmail(req, res, next) {

  }

  /**
   * @static
   * Returns user signin object
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} returns user signin object
   * @memberof AuthController
   */
  static async resendVerification(req, res, next) {

  }

}

module.exports = AuthController;