const models = require('../models');
const slugify = require('slugify');
const serverResponse = require('../modules/serverResponse');
const paginate = require('../helpers/paginateHelper');
const paginateCount = require('../helpers/paginateCountHelper');

const {
  successResponse,
  errorResponse,
  serverErrorResponsess
} = serverResponse;

const {
  blog
} = models;

class NewsController {

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns object
   * @memberof NewsController
   */
  static async createNews(req, res, next) {

    try {

    } catch (error) {

    }
  }

}

module.exports = NewsController;