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
  faq
} = models;

const {
  errorResponse,
  successResponse,
  serverErrorResponse
} = serverResponse;


class FaqController {

  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof PostController
   */
  static async newFaqs(req, res, next) {
    try {

      return faq
        .create(req.body)
        .then((response) => {
          successResponse(res, 200, 'faq', response)
        })
        .catch((error) => {
          serverErrorResponse(error, req, res, next);
        });

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
   * @memberof PostController
   */
  static async getFaqs(req, res, next) {
    try {

      const {
        faqtype,
        page,
        size,
        search,
        filter
      } = req.query;


      return faq
        .findAndCountAll({
          where: {
            faqtype: faqtype,
            [Op.or]: [{
              title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + search + '%'),
            }]
          },
          order: [
            ['created_at', 'ASC'],
          ],
          attributes: ['id', 'title', 'image', 'isimage', 'posttype', 'status', 'created_at'],
          ...pagination({
            page,
            size
          }),
        })
        .then(response => {
          successResponse(res, 200, 'posts', paginateCount(response, page, size));
        })
        .catch(error => {
          serverErrorResponse(error, req, res, next);
        });

    } catch (error) {
      serverErrorResponse(error, req, res, next);
      // return next(error);
    }
  }

  /**
   * @static
   * Gets All Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Posts body payload
   * @memberof PostController
   */
  static async getOneFaqs(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return faq
        .findOne({
          where: {
            id: id
          }
        })
        .then(response => {
          successResponse(res, 200, 'posts', response)
        })
        .catch(error => {
          errorResponse(res, 400, error);
        });

    } catch (err) {
      return next(err);
    }
  }

}

module.exports = FaqController;