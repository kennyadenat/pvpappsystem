const models = require('../models');
const serverResponse = require('../modules/serverResponse');
const authHelper = require('../helpers/authHelper');

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

      const newUser = {
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword
      };

      const verifyToken = await hashUserData(email);

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

}

module.exports = AuthController;