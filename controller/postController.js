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
  successResponse,
  serverErrorResponse
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

      ///
      if (onePost) {
        req.body.slug = slugify(req.body.title, {
          lower: true
        });

        const updatedPost = {
          id: req.body.id,
          image: req.body.image,
          isimage: req.body.isimage,
          title: req.body.title,
          slug: req.body.slug,
          posttype: req.body.posttype,
          status: req.body.status,
          tags: req.body.tags ? JSON.parse(req.body.tags) : [],
          body: req.body.body ? JSON.parse(req.body.body) : [],
        };

        return onePost
          .update(updatedPost, {
            fields: Object.keys(updatedPost)
          })
          .then((response) => {
            successResponse(res, 204, 'posts', response);
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
  static async getOnePosts(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return post
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

module.exports = PostController;