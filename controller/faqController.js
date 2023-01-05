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

      req.body.tag = randomstring.generate({
        length: 5,
        capitalization: 'lowercase',
        charsetz: 'alphabetic'
      });
      return faq
        .create(req.body)
        .then((response) => {
          successResponse(res, 200, 'faq', response)
        })
        .catch((error) => {
          console.log(error);
          serverErrorResponse(error, req, res, next);
        });

    } catch (error) {
      console.log(error);
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
              question: sequelize.where(sequelize.fn('LOWER', sequelize.col('question')), 'LIKE', '%' + search + '%'),
            }]
          },
          order: [
            ['created_at', 'ASC'],
          ],
          attributes: ['id', 'question', 'faqtype', 'answers', 'tag', 'created_at'],
          ...pagination({
            page,
            size
          }),
        })
        .then(response => {
          successResponse(res, 200, 'faq', paginateCount(response, page, size));
        })
        .catch(error => {
          console.log(error);
          serverErrorResponse(error, req, res, next);
        });

    } catch (error) {
      console.log(error);
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
          successResponse(res, 200, 'faq', response)
        })
        .catch(error => {
          errorResponse(res, 400, error);
        });

    } catch (err) {
      return next(err);
    }
  }


  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof PostController
   */
  static async updateFaq(req, res, next) {
    try {

      const oneFaq = await faq.findOne({
        where: {
          id: req.body.id
        },
        attributes: ['id']
      });

      ///
      if (oneFaq) {
        return oneFaq
          .update(req.body, {
            fields: Object.keys(req.body)
          })
          .then((response) => {
            successResponse(res, 204, 'faq', response);
          }) // Send back the updated todo.
          .catch((error) => {
            errorResponse(res, 400, 'There was an error processing your request');
          });

      } else {
        errorResponse(res, 400, 'The post does not exist or has been removed');
      }

    } catch (error) {
      return next(error);
    }
  }

}

module.exports = FaqController;