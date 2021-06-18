const gravatar = require('gravatar');
const models = require('../models');
const serverResponse = require('../modules/serverResponse');
const authHelper = require('../helpers/authHelper');
const emailHelper = require('../helpers/emailVerification');
const markUps = require('../helpers/markUps');

require('dotenv').config();

const {
  sendEmailVerification,
  sendPasswordReset
} = emailHelper;

const {
  authors
} = models;

const {
  createToken,
  hashPassword,
  hashUserData,
  comparePassword,
  verifyToken
} = authHelper;

const {
  successResponse,
  errorResponse
} = serverResponse;

const {
  incorrectCredentials
} = markUps;

const authorAttributes = [
  'id',
  'email',
  'role',
  'avatar',
  'approved',
  'token'
];

const oneAuthorAttr = [
  'id',
  'email',
  'password'
];

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
        password,
        role
      } = req.body;

      const hashedPassword = await hashPassword(password);
      // Generate Email Verifiation Token
      const verifyToken = await hashUserData(email);
      // Send Email Verification to User to Confirm Email Address
      sendEmailVerification(email, verifyToken);

      var avatarUrl = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      }, true);

      const newUser = {
        email: email,
        role: role,
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
          successResponse(res, 200, 'author',
            'Your email account has already been verified'
          )
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
  static async resendVerification(req, res, next) {
    try {

    } catch (error) {
      return next(error);
    }
  }

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

        if (passwordValue) {
          const newUser = {
            email: email,
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


  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * @returns {string} email link
   * @memberof AuthController
   */
  static async forgotPassword(req, res, next) {
    try {

      const {
        email
      } = req.body;

      const oneAuthor = await authors.findOne({
        where: {
          email: email
        }
      });
      if (!oneAuthor) {
        errorResponse(res, 400, 'Account does not exist')
      }
      const {
        firstname,
        id
      } = oneAuthor.dataValues;
      const resetToken = await createToken({
        email: email,
        id: id
      });
      sendPasswordReset(firstname, email, resetToken);
      successResponse(res, 200, 'message', {
        message: 'Password reset link sent to your email',
        token: resetToken
      });

    } catch (error) {
      return next(error);
    }
  }


  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * @returns {string} Message Success
   * @memberof AuthController
   */
  static async resetPasword(req, res, next) {
    const {
      email,
      password,
      token
    } = req.body;

    // check if the email address exists
    const oneAuthor = await authors.findOne({
      where: {
        email: email
      },
      attributes: oneAuthorAttr
    });

    // check if the token generated is the same
    if (oneAuthor) {

      try {

        const oneToken = await verifyToken(token);
        // compare password t ensure its different from last used password
        const passValue = await comparePassword(password, oneAuthor.dataValues.password);
        if (passValue) {
          errorResponse(res, 400, 'Cant use old password. please change to a new one');
        } else {

          const newPassword = await hashPassword(password);
          const passOption = {
            password: newPassword
          };

          return oneAuthor
            .update(passOption, {
              fields: Object.keys(passOption)
            }, {
              oneAuthorAttr
            })
            .then((classRes) => {
              successResponse(res, 200, 'success', 'Password successfully changed.');
            }) // Send back the updated todo.
            .catch((error) => {
              errorResponse(res, 400, error);
            });
        }

      } catch (error) {
        errorResponse(res, 400, 'Invalid Token. Please resend verification');
      }

    } else {
      res.setHeader('Content-Type', 'text/html');
      return res.send(incorrectCredentials);
    }
  }

}

module.exports = AuthController;