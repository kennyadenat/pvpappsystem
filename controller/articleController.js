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
  article
} = models;

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
        tags: tags ? [...tags] : [],
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
          console.log(error);
          errorResponse(res, 400, error)
        });

    } catch (error) {
      return next(error);
    }
  }

}

module.exports = ArticleController;