const models = require('../models');
const serverResponse = require('../modules/serverResponse');
require('dotenv').config();
const {
  check,
  validationResult,
  param
} = require('express-validator');


/**
 * 
 * @exports
 * @class
 */
const AuthorValidation = {
  createAuthor: [],
  signAuthor: []
};


module.exports = AuthorValidation;