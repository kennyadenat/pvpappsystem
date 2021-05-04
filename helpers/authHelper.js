const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const {
  SECRET_KEY
} = process.env;

/** 
 * Handles access token generation and verification
 */
class AuthHelper {

  /**
   * @description Handles access token generation
   * @param {object} payload - The user credential {id, isAdmin}
   * @return {string} access token
   */
  static createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {
      expiresIn: '24d'
    });
  }

  /**
   * @description Handles access token generation
   * @param {object} payload - The user credential {id, isAdmin}
   * @return {string} access token
   */
  static returnToken(payload, res) {
    const token = this.createToken(payload);
    return res.status(200).send({
      fullname: `${payload.fullname}`,
      id: payload.id,
      avatar: payload.avatar,
      email: payload.emails,
      token: token,
      role: payload.role,
    });
  }

  /**
   * @description Handles access token verification
   * @param {string} token - The user credential {id, isAdmin}
   * @return {object} access token values
   */
  static verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
  }

  /**
   * @method hashPassword
   * @description Hashes the user inputed password
   * @param {string} password - The user password to be hashed
   * @returns {string} A string of the hashed password
   */
  static async hashPassword(password, next) {
    return next(bcrypt.hashSync(password, 10));
  }

  /**
   * @method comparePassword
   * @description compares the user inputed password with hashPassword
   * @param {string} password - The user password to be compared
   * @param {string} hashPassword - The hashed password in the database
   * @returns {string} A hashed password
   */
  static async comparePassword(password, hashPassword, next) {
    return next(bcrypt.compareSync(password, hashPassword));
  }

  /**
   * @method hashUserData
   * @description Hashes the user inputed password
   * @param {string} user - The user password to be hashed
   * @returns {string} A string of the hashed password
   */
  static async hashUserData(user) {
    return bcrypt.hashSync(user, 10);
  }
}

module.exports = AuthHelper;