const slugify = require('slugify');
const models = require('../models');
const {
  check,
  param,
  validationResult
} = require('express-validator');


const ArticleValidation = {
  articleVal: [
    check('tags')
    .optional()
    .custom((value) => {
      if (!Array.isArray(value)) {
        return false;
      }
      return value;
    })
    .withMessage('Tags must be grouped in an array')
    .custom((value) => {
      if (value.length > 10) {
        return false;
      }
      return value;
    })
    .withMessage('Only a maximum of 10 tags are allowed'),
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

module.exports = ArticleValidation;