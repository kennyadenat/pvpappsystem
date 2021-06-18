const models = require('../models');
const serverResponse = require('../modules/serverResponse');
require('dotenv').config();
const {
  check,
  validationResult,
  param
} = require('express-validator');
const {
  authors
} = models;


/**
 * 
 * @exports
 * @class
 */
const AuthorValidation = {
  createAuthor: [
    check('email')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('Email is Required')
    .isEmail()
    .trim()
    .withMessage('Please input a valid email address')
    .custom(async (email) => {
      const isExist = await authors.findOne({
        where: {
          email: email
        },
        attributes: [
          'id',
          'email',
        ]
      });
      if (isExist) {
        throw new Error(`Account with email ${email} already exists.`);
      }
      return true;
    }),
    check('password')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('Password is required')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'i')
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter and one numeric digit')
    .trim()
    .isLength({
      min: 8
    })
    .withMessage('Password must be at least 8 characters')
    .custom((value, {
      req
    }) => {
      const {
        firstname,
        lastname,
        password
      } = req.body;
      const genericWordsArray = [firstname, lastname, 'Password', 'password', 123];
      const genericWord = genericWordsArray.find(word => password.includes(word));

      if (genericWord) {
        return false;
      }
      return value;
    })
    .withMessage("Do not use a common word as the password"),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({
          onlyFirstError: true
        }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage
        });
      }
      return next();
    }
  ],
  signAuthor: [
    check('email')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('Email is Required')
    .isEmail()
    .trim()
    .withMessage('Please input a valid email address'),
    check('password')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('Password is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({
          onlyFirstError: true
        }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage
        });
      }
      return next();
    }
  ],
  validateEmail: [
    check('email')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('Please provide your email address')
    .isEmail()
    .trim()
    .withMessage('Please input a valid email address'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({
          onlyFirstError: true
        }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage
        });
      }
      return next();
    }
  ]
};


module.exports = AuthorValidation;