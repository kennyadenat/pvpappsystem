const models = require('../models');
const paginateCount = require('../helpers/paginationHelper');
const pagination = require('../helpers/paginateHelper');
const serverResponse = require('../modules/serverResponse');
var randomstring = require("randomstring");
var fs = require('fs');


const {
  Op,
  Sequelize
} = require("sequelize");
const {
  sequelize
} = require('../models');

const {
  docs,
  doctrack
} = models;

const {
  errorResponse,
  successResponse,
  serverErrorResponse
} = serverResponse;

class SupportController {

}

module.exports = SupportController;