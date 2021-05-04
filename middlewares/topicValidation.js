const models = require('../models');
const {
  check,
  param,
  validationResult
} = require('express-validator');


const TopicValidation = {
  createtopic: [],
  createsubtopic: []
}

module.exports = TopicValidation