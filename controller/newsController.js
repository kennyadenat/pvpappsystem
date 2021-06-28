const models = require('../models');
const slugify = require('slugify');
const serverResponse = require('../modules/serverResponse');
const paginate = require('../helpers/paginateHelper');
const paginateCount = require('../helpers/paginateCountHelper');
const imageUploads = require('../helpers/imageUpload');
const fs = require('fs');


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

      imageUploads(req.file, (image) => {
        if (image.err) {
          console.log('false')
        } else {
          console.log('true');
          console.log(image.data);
        }
      });

    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

}

module.exports = NewsController;