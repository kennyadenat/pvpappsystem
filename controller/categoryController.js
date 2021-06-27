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
  site_name,
  category,
  blog
} = models;

const siteAttr = [
  'id',
  'name',
];

const catAttr = [
  'id',
  'title',
];

const blogAttr = [
  'id'
]

/**
 * @exports
 * @class TopicController
 */
class CategoryController {


  /**
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns {object} object
   * @memberof TopicController
   */
  static async createSite(req, res, next) {
    try {

      const {
        name
      } = req.body;

      const newSite = {
        name: name.toLowerCase()
      };

      site_name
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
   * @param {function} next 
   * @returns {object} object
   * @memberof TopicController
   */
  static async createCategory(req, res, next) {
    try {

      const {
        title,
        site_page_id,
        overview
      } = req.body;

      const newTopic = {
        title: title,
        site_page_id: site_page_id,
        overview: overview,
        slug: slugify(title, {
          lower: true
        })
      };

      pvp_topic.create(newTopic)
        .then((response) => {
          successResponse(res, 200, 'topic', response)
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
   * @memberof CategoryController
   */
  static async getAllSites(req, res, next) {
    try {

      return site_name
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
   * @param {object} next 
   * @returns {object}
   * @memberof TopicController
   */
  static async getOneSite(req, res, next) {
    try {

      const {
        site
      } = req.query;

      return site_name
        .findOne({
          where: {
            name: site
          },
          attributes: siteAttr,
          include: [{
            model: category,
            as: 'categories',
            attributes: catAttr,
            include: [{
              model: blog,
              as: 'blogs',
              attributes: blogAttr
            }]
          }]
        }).then((response) => successResponse(res, 200, 'topic', response))
        .catch((error) => {
          console.log(error);
          errorResponse(res, 400, error)
        });

    } catch (error) {
      console.log(error);
      return next(error);
    }
  }


}

module.exports = CategoryController