const models = require('../models');
const serverResponse = require('../modules/serverResponse');

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

  }
}

module.exports = FaqController;