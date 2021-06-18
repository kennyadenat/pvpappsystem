const models = require('../models');
const {
  check,
  param,
  validationResult
} = require('express-validator');


const TopicValidation = {
  topicVal: [
    check('title')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('title cannot be empty')
    .isLength({
      min: 2,
      max: 244
    })
    .withMessage('title must be between 2 to 244 charaters long'),
    check('overview')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('overview cannot be empty')
    .isLength({
      min: 2,
      max: 365
    })
    .withMessage('overview must be between 2 to 365 charaters long'),
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
          errors: errorMessage,
        });
      }
      return next();
    }
  ],
  subtopicVal: [
    check('title')
    .not()
    .isEmpty({
      ignore_whitespace: true
    })
    .withMessage('title cannot be empty')
    .isLength({
      min: 2,
      max: 244
    })
    .withMessage('title must be between 2 to 244 charaters long'),
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
          errors: errorMessage,
        });
      }
      return next();
    }
  ]
}

module.exports = TopicValidation