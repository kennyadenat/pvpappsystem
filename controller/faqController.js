const models = require('../models');
const serverResponse = require('../modules/serverResponse');
const paginate = require('../helpers/paginateHelper');
const paginateCount = require('../helpers/paginateCountHelper');


const {
  faq,
  faq_site
} = models;

const siteAttr = [
  'id',
  'name',
];

const faqAttr = [
  'id',
  'question',
  'answer',
  'ref',
  'tag',
];

const {
  successResponse,
  errorResponse,
  serverErrorResponse
} = serverResponse;

function getChar(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}
class FaqController {


  /**
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns {object} object
   * @memberof FaqController
   */
  static async createSite(req, res, next) {
    try {

      const {
        name
      } = req.body;

      const newSite = {
        name: name.toLowerCase()
      };

      faq_site
        .create(newSite)
        .then((response) => {
          successResponse(res, 200, 'site', response)
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
   * @param {object} next 
   * @returns {object}
   * @memberof FaqController
   */
  static async getAllSites(req, res, next) {
    try {

      return faq_site
        .findAll({
          order: [
            ['name', 'ASC'],
          ],
          attributes: siteAttr,
        })
        .then(response => {
          successResponse(res, 200, 'site', response);
        })
        .catch(error => {
          errorResponse(res, 200, error);
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
   * @returns {object}
   * @memberof FaqController
   */
  static async addFaq(req, res, next) {
    try {

      const {
        site,
        question,
        answer,
        faq_site_id,
        ref
      } = req.body;

      const newFaq = {
        site: site,
        question: question,
        faq_site_id: faq_site_id,
        answer: answer,
        tag: getChar(7),
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
   * @returns {object}
   * @memberof FaqController
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


  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns {Array}
   * @memberof FaqController
   */
  static async getSiteFaq(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return faq_site
        .findOne({
          where: {
            id: id
          },
          order: [
            ['name', 'ASC'],
          ],
          attributes: siteAttr,
          include: [{
            model: faq,
            as: 'faqs',
            attributes: faqAttr,
          }]
        })
        .then(response => {
          successResponse(res, 200, 'faq', response);
        })
        .catch(error => {
          errorResponse(res, 400, error);
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
   * @returns {Array}
   * @memberof FaqController
   */
  static async getFaqName(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return faq_site
        .findOne({
          where: {
            name: id
          },
          order: [
            ['name', 'ASC'],
          ],
          attributes: siteAttr,
          include: [{
            model: faq,
            as: 'faqs',
            attributes: faqAttr,
          }]
        })
        .then(response => {
          if (response == null) {
            errorResponse(res, 400, 'No Faqs Found');
          } else {
            successResponse(res, 200, 'faq', response);
          }
        })
        .catch(error => {
          errorResponse(res, 400, error);
        });


    } catch (error) {
      return next(error);
    }
  }
}

module.exports = FaqController;