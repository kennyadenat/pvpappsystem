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
  category,
  resourcepost,
  article
} = models;

const {
  errorResponse,
  successResponse,
  serverErrorResponse
} = serverResponse;


class ArticleController {

  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof PostController
   */
  static async newCategory(req, res, next) {
    try {

      const oneCount = await resourcepost.findOne({
        where: {
          options: req.body.resourcetype
        },
        attributes: ['id', 'options', 'currentcount']
      });

      if (oneCount) {
        req.body.index = oneCount.dataValues.currentcount + 1;

        const upRes = {
          currentcount: oneCount.dataValues.currentcount + 1
        };

        oneCount
          .update(upRes, {
            fields: Object.keys(upRes)
          })

        return category
          .create(req.body)
          .then((response) => {
            successResponse(res, 200, 'article', response)
          })
          .catch((error) => {
            serverErrorResponse(error, req, res, next);
          });
      } else {

        const oneNewCount = {
          options: req.body.resourcetype,
          currentcount: 1
        };

        const newCount = await resourcepost.create(oneNewCount);
        req.body.index = 1;

        return category
          .create(req.body)
          .then((response) => {
            successResponse(res, 200, 'article', response)
          })
          .catch((error) => {
            serverErrorResponse(error, req, res, next);
          });

      }


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
  static async getCategory(req, res, next) {
    try {

      const {
        resourcetype,
        page,
        size,
        search,
        filter
      } = req.query;


      return category
        .findAndCountAll({
          where: {
            resourcetype: resourcetype,
            [Op.or]: [{
              title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + search + '%'),
            }]
          },
          order: [
            ['index', 'ASC'],
          ],
          attributes: ['id', 'title', 'resourcetype', 'subcategory', 'index', 'created_at'],
          ...pagination({
            page,
            size
          }),
        })
        .then(response => {
          successResponse(res, 200, 'article', paginateCount(response, page, size));
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
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof PostController
   */
  static async updateCategory(req, res, next) {
    try {

      console.log(req.body);

      const oneCategory = await category.findOne({
        where: {
          id: req.body.id
        },
        attributes: ['id']
      });

      ///
      if (oneCategory) {
        return oneCategory
          .update(req.body, {
            fields: Object.keys(req.body)
          })
          .then((response) => {
            successResponse(res, 204, 'article', response);
          }) // Send back the updated todo.
          .catch((error) => {
            console.log(error);
            errorResponse(res, 400, 'There was an error processing your request');
          });

      } else {
        console.log(error);
        errorResponse(res, 400, 'The post does not exist or has been removed');
      }

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
  static async getOneCategory(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return category
        .findOne({
          where: {
            id: id
          }
        })
        .then(response => {
          successResponse(res, 200, 'article', response)
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
   * Gets All Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Posts body payload
   * @memberof PostController
   */
  static async newSubCategory(req, res, next) {
    try {

      const oneCategory = await category.findOne({
        where: {
          id: req.body.categoryid
        },
        attributes: ['id', 'subcategory', 'currentcount']
      });

    } catch (error) {
      return next(error);
    }
  }

}

module.exports = ArticleController;