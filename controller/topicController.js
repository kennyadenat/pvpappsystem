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
  pvp_topic,
  pvp_subtopic
} = models;

const topicAttr = [
  'title',
  'slug',
  'thumbnail',
  'overview'
];

const subtopicAttr = [
  'title',
  'slug',
  'thumbnail',
  'body'
];

/**
 * @exports
 * @class TopicController
 */
class TopicController {


  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * @returns {object}
   * @memberof TopicController
   */
  static async getTopics(req, res, next) {
    try {

      const {
        page,
        size
      } = req.query;

      return pvp_topic
        .findAndCountAll({
          attributes: topicAttr,
          ...paginate({
            page,
            size
          }),
        })
        .then((response) => {
          successResponse(res, 200, 'topics', paginateCount(response, page, size))
        })
        .catch((error) => {
          errorResponse(res, 200, error);
        })

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
  static async createTopic(req, res, next) {
    try {

      const {
        title,
        thumbnail,
        overview
      } = req.body;

      const newTopic = {
        title: title.toLowerCase(),
        thumbnail: thumbnail,
        slug: slugify(title, {
          lower: true
        }),
        overview: overview
      };

      successResponse(res, 200, 'resp', newTopic);

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
   * @memberof TopicController
   */
  static async createSubtopic(req, res, next) {
    try {

      const {
        title,
        pvp_topic_id,
        thumbnail,
        body
      } = req.body;

      const newSubtopic = {
        pvp_topic_id: pvp_topic_id,
        title: title.toLowerCase(),
        thumbnail: thumbnail,
        slug: slugify(title, {
          lower: true
        }),
        body: body,
      };

      pvp_subtopic.create(newSubtopic)
        .then((response) => {
          successResponse(res, 200, 'subtopic', response);
        })
        .catch((error) => {
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
   * @returns {object} object
   * @memberof TopicController
   */
  static async updateTopic(req, res, next) {
    try {

      const {} = req.body;

    } catch (error) {
      return next(error);
    }
  }

}

module.exports = TopicController;