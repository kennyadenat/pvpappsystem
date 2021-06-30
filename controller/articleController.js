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
  article,
  pvp_topic,
  pvp_subtopic
} = models;

const topicAttr = [
  'id',
  'title'
];

const subTopicAttr = [
  'id',
  'title'
];

const articleAttr = [
  'id',
  'title',
  'body',
  'read_time',
  'read_count',
  'tags',
  'status',
  'authors_id',
  'pvp_subtopic_id',
];

const articleAttrs = [
  'title',
  'body',
  'read_time',
  'status',
  'tags',
  'authors_id',
  'pvp_subtopic_id',
];

/**
 * @exports
 * @class ArticleController
 */
class ArticleController {

  /**
   * 
   * @param {function} req 
   * @param {function} res 
   * @param {function} next 
   * @returns {object}
   * @memberof ArticleController
   */
  static async createArticle(req, res, next) {
    try {

      const {
        authors_id,
        read_time,
        pvp_subtopic_id,
        body,
        tags,
        status,
        title
      } = req.body;

      const newArticle = {
        title: title,
        authors_id: authors_id,
        read_time: read_time,
        pvp_subtopic_id: pvp_subtopic_id,
        body: body,
        tags: tags ? tags : [],
        status: status,
        slug: slugify(title, {
          lower: true
        })
      };

      article.create(newArticle)
        .then((response) => {
          successResponse(res, 200, 'article', response)
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
   * @memberof ArticleController
   */
  static async updateArticle(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return article
        .findByPk(id)
        .then(respArticle => {
          if (!respArticle) {
            errorResponse(res, 404, 'Article not Found')
          }

          return respArticle
            .update(req.body, {
              fields: Object.keys(req.body)
            }, {
              articleAttr
            })
            .then((response) => successResponse(res, 200, 'article', response)) // Send back the updated todo.
            .catch((error) => {
              errorResponse(res, 400, error)
            });

        })
        .catch((error) => {
          return next(error);
        });
    } catch (error) {

    }
  }

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns {object}
   * @memberof ArticleController
   */
  static async getOneArticle(req, res, next) {
    try {
      const {
        id
      } = req.query;
      return article
        .findOne({
          where: {
            pvp_subtopic_id: id
          },
          attributes: articleAttr,
          include: [{
            model: pvp_subtopic,
            as: 'pvp_subtopics',
            attributes: topicAttr,
            include: [{
              model: pvp_topic,
              as: 'pvp_topics',
              attributes: subTopicAttr,
            }]
          }]
        }).then((response) => {
          if (response) {
            successResponse(res, 200, 'article', response);
          } else {
            errorResponse(res, 404, 'Article Not Found')
          }

        })
        .catch((error) => errorResponse(res, 400, error))
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
   * @memberof ArticleController
   */
  static async getEditArticle(req, res, next) {}

  static async getUploads(req, res, next) {
    try {
      console.log('params', req.body);
    } catch (error) {

    }
  }

}

module.exports = ArticleController;