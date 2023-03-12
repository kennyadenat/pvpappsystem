const models = require('../models');
const paginateCount = require('../helpers/paginationHelper');
const pagination = require('../helpers/paginateHelper');
const serverResponse = require('../modules/serverResponse');
var randomstring = require("randomstring");

const {
  Op,
  Sequelize
} = require("sequelize");
const {
  sequelize
} = require('../models');

const {
  docs
} = models;

const {
  errorResponse,
  successResponse,
  serverErrorResponse
} = serverResponse;

class DocController {

  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof DocController
   */
  static async addDocs(req, res, next) {
    try {

      console.log(req.body);

      console.log('file', req.file);

      const newFile = {
        title: req.body.title,
        category: req.body.category,
        url: req.file.originalname,
        code: 'PVPNG_0001'
      };

      // return docs
      //   .create(req.body)
      //   .then((response) => {
      //     successResponse(res, 200, 'docs', response)
      //   })
      //   .catch((error) => {
      //     serverErrorResponse(error, req, res, next);
      //   });

    } catch (error) {
      return next(error);
    }
  }


  /**
   * @static
   * Gets All Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Posts body payload
   * @memberof FaqController
   */
  static async getDocs(req, res, next) {
    try {

      const {
        page,
        size,
        search,
        filter
      } = req.query;


      return docs
        .findAndCountAll({
          where: {
            [Op.or]: [{
              title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + search + '%'),
            }]
          },
          order: [
            ['created_at', 'DESC'],
          ],
          attributes: ['id', 'title', 'category', 'code', 'url', 'created_at'],
          ...pagination({
            page,
            size
          }),
        })
        .then(response => {
          successResponse(res, 200, 'docs', paginateCount(response, page, size));
        })
        .catch(error => {
          console.log(error);
          serverErrorResponse(error, req, res, next);
        });

    } catch (error) {
      serverErrorResponse(error, req, res, next);
      // return next(error);
    }
  }

}

module.exports = DocController;