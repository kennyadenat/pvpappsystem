const gravatar = require('gravatar');
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
  hashUserData,
  comparePassword
} = authHelper;

const {
  successResponse,
  errorResponse
} = serverResponse;

const authorAttributes = ['id', 'email', 'firstname', 'lastname',
  'role', 'avatar', 'approved', 'token'
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
   * @returns {string} token
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

      var avatarUrl = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      }, true);

      const newUser = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        role: 'admin',
        avatar: avatarUrl
      };

      const token = await createToken(newUser);

      newUser.password = hashedPassword;
      newUser.token = verifyToken;

      // create the user after sending the verification email
      return authors
        .create(newUser)
        .then(newAuthor => {
          successResponse(res, 201, 'authors', token);
        })
        .catch(error => {
          errorResponse(res, 400, {
            error: error
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
    try {

      const {
        email,
        token
      } = req.query;

      // check if the email address exists
      const oldAuthor = await authors.findOne({
        where: {
          email: email
        },
        attributes: authorAttributes
      });

      if (oldAuthor) {
        if (oldAuthor.dataValues.approved) {
          successResponse(res, 200, 'author', {
            message: 'Your email account has already been verified'
          })
        } else if (token === oldAuthor.dataValues.token) {
          // check if the token are a match and then update . . 
          await authors.update({
            approved: true
          }, {
            where: {
              email: email
            }
          });

          const newUser = {
            email: oldAuthor.dataValues.email,
            firstname: oldAuthor.dataValues.firstname,
            lastname: oldAuthor.dataValues.lastname,
            role: 'admin',
            avatar: oldAuthor.dataValues.avatar
          };

          // Generate token and send redirect. . . 
          const newToken = await createToken(newUser);
          // res.redirect(`${process.env.FRONTEND_URL}/signin?token=${newToken}`);
          successResponse(res, 200, 'author', newToken);

        } else if (token !== oldAuthor.dataValues.token) {
          errorResponse(res, 400, {
            error: 'Your verification credentials are invalid'
          })
        }
      } else {
        errorResponse(res, 400, {
          error: 'User does not exist'
        });
      }

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
  static async resendVerification(req, res, next) {}

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {string} token
   * @memberof AuthController 
   */
  static async signIn(req, res, next) {
    try {


      const oneAuthor = await authors.findOne({
        where: {
          email: req.body.email
        }
      });

      if (oneAuthor) {
        const {
          email,
          firstname,
          lastname,
          avatar,
          role,
          password
        } = oneAuthor.dataValues;
        const passwordValue = await comparePassword(req.body.password, password);

        console.log(passwordValue)
        if (passwordValue) {
          const newUser = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            role: role,
            avatar: avatar
          };

          const newToken = await createToken(newUser);
          successResponse(res, 200, 'author', newToken);

        }
        errorResponse(res, 400, {
          error: 'Password mismatch. Please try again!.'
        });
      } else {
        errorResponse(res, 400, {
          error: 'The user account does not exist.'
        });
      }

    } catch (error) {
      return next(error);
    }
  }

}

module.exports = AuthController;