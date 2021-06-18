const jwt = require('jsonwebtoken');
const models = require('../models');
const serverResponse = require('../modules/serverResponse');
require('dotenv').config();


const {
  SECRET_KEY
} = process.env;

const {
  successResponse,
  errorResponse
} = serverResponse;

/**
 * 
 * @exports
 * @class
 */
class Authentication {

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns {function} next function
   * @memberof Authentication
   * 
   */
  static async verifyToken(req, res, next) {
    try {
      const {
        authorization
      } = req.headers;

      if (!authorization) {
        return errorResponse(res, 401, {
          message: 'No token provided'
        });
      }
      const token = authorization.split(' ')[1];
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        (err, decoded);
        if (err) {
          return errorResponse(res, 401, {
            message: 'Invalid token provided',
          });
        }
        console.log({
          decoded
        });
        if (decoded.role !== 'super_admin') {
          return errorResponse(res, 401, {
            message: 'You are not authorized to view this page',
          });
        }

        req.user = decoded;
        return next();
      });
    } catch (err) {
      return next(err);
    }
  }


  static async verifyAdmin(req, res, next) {

  }

}

module.exports = Authentication;