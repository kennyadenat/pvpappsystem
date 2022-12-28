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
  post
} = models;

const {
  errorResponse,
  successResponse
} = serverResponse;
class PostController {

  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof PostController
   */
  static async newPosts(req, res, next) {
    try {
      const dates = new Date();
      const newPosts = {
        title: `${req.body.post}-${dates.toISOString()}`,
        posttype: req.body.post,
        status: 'draft',
      };

      return post
        .create(newPosts)
        .then((response) => {
          successResponse(res, 200, 'posts', response)
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
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof PostController
   */
  static async publishPosts(req, res, next) {
    try {

      const onePost = await post.findOne({
        where: {
          id: req.body.id
        },
        attributes: ['id']
      });

      if (onePost) {

        req.body.slug = slugify(req.body.title, {
          lower: true
        });

        return onePost
          .update(req.body, {
            fields: Object.keys(req.body)
          })
          .then((response) => {
            successResponse(res, 200, 'posts', response);
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

  /**
   * @static
   * Gets All Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Posts body payload
   * @memberof PostController
   */
  static async getPosts(req, res, next) {
    try {

      const {
        posttype,
        page,
        size,
        search,
        filter
      } = req.query;


      return post
        .findAndCountAll({
          where: {
            posttype: posttype,
            [Op.or]: [{
              title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + search + '%'),
            }]
          },
          order: [
            ['created_at', 'ASC'],
          ],
          attributes: examAttr,
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

}

module.exports = PostController;