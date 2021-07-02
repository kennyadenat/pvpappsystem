const models = require('../models');
const serverResponse = require('../modules/serverResponse');

const {
  successResponse,
  errorResponse,
  serverErrorResponse
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
        site_name_id,
      } = req.body;

      const newCat = {
        title: title.toLowerCase(),
        site_name_id: site_name_id
      };

      category.create(newCat)
        .then((response) => {
          successResponse(res, 200, 'cat', response)
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
   * @param {function} next 
   */
  static async getAllCategory(req, res, next) {
    try {

      return category
        .findAll({
          order: [
            ['title', 'ASC'],
          ],
          attributes: catAttr,
        })
        .then(response => {
          successResponse(res, 200, 'cat', response);
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
   * @memberof TopicController
   */
  static async getOneCat(req, res, next) {
    try {
      const {
        id
      } = req.query;

      const getSite = await site_name.findOne({
        where: {
          name: id.toLowerCase()
        }
      });

      category
        .findAll({
          where: {
            site_name_id: getSite.dataValues.id
          },
          attributes: catAttr
        }).then((response) => successResponse(res, 200, 'cat', response))
        .catch((error) => {
          errorResponse(res, 400, error)
        });
    } catch (error) {

    }
  }


}

module.exports = CategoryController