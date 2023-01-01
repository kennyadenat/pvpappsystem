const models = require('../models');
const paginateCount = require('../helpers/paginationHelper');
const pagination = require('../helpers/paginateHelper');
const serverResponse = require('../modules/serverResponse');
var slugify = require('slugify');


const {
  Op,
  Sequelize
} = require("sequelize");
const {
  sequelize
} = require('../models');

const {
  post
} = models;

const {
  errorResponse,
  successResponse,
  serverErrorResponse
} = serverResponse;


class ArticleController {

}

module.exports = ArticleController;