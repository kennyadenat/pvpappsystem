const models = require('../models');
const serverResponse = require('../modules/serverResponse');
const paginate = require('../helpers/paginateHelper');
const paginateCount = require('../helpers/paginateCountHelper');


const {
  faq
} = models;

const {
  successResponse,
  errorResponse,
  serverErrorResponse
} = serverResponse;

class FaqController {

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   */
  static async addFaq(req, res, next) {
    try {

      const {
        site,
        question,
        answer,
        ref
      } = req.body;

      const newFaq = {
        site: site,
        question: question,
        answer: answer,
        ref: ref ? ref : [],
      };

      faq
        .create(newFaq)
        .then((response) => {
          successResponse(res, 200, 'faq', response)
        })
        .catch((error) => {
          errorResponse(res, 400, error)
        });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   */
  static async getFaq(req, res, next) {
    try {

      const {
        page,
        size,
        search,
        filter
      } = req.query;

      faq
        .findAndCountAll({
          order: [
            [`created_at`, 'ASC'],
          ],
          ...paginate({
            page,
            size
          }),
        }).then((response) => {
          successResponse(res, 200, 'faq', paginateCount(response, page, size))
        })
        .catch((error) => {
          errorResponse(res, 400, error)
        });

    } catch (error) {
      return next(error);
    }
  }
}

module.exports = FaqController;