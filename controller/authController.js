const models = require('../models');
const serverResponse = require('../modules/serverResponse');
const authHelper = require('../helpers/authHelper');

const {
  createToken,
  hashPassword
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
        firstname,
        lastname,
        password
      } = req.body;

      hashPassword(password, (pass) => {
        console.log(pass);
      });

    } catch (error) {
      console.log(error);
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

}

module.exports = AuthController;