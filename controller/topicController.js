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
  pvp_subtopic,
  site_page,
  article
} = models;

const siteAttr = [
  'id',
  'name',
];


const topicAttr = [
  'id',
  'title',
  'slug',
  'site_page_id'
];


const articleAttr = [
  'id'
];


const subtopicAttr = [
  'id',
  'title',
  'slug',
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
  static async getAllTopic(req, res, next) {

    try {
      return pvp_topic
        .findAll({
          order: [
            ['created_at', 'ASC'],
          ],
          attributes: topicAttr,
          include: [{
            model: pvp_subtopic,
            as: 'pvp_subtopics',
            attributes: subtopicAttr
          }]
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
  static async getAllSites(req, res, next) {
    try {

      return site_page
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

      return site_page
        .findOne({
          where: {
            name: site
          },
          attributes: siteAttr,
          include: [{
            model: pvp_topic,
            as: 'pvp_topics',
            attributes: topicAttr,
            include: [{
              model: pvp_subtopic,
              as: 'pvp_subtopics',
              attributes: subtopicAttr,
              include: [{
                model: article,
                as: 'articles',
                attributes: articleAttr,
              }]
            }]
          }]
        }).then((response) => successResponse(res, 200, 'topic', response))
        .catch((error) => errorResponse(res, 400, error));

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
  static async createSite(req, res, next) {
    try {

      const {
        name
      } = req.body;

      const newSite = {
        name: name.toLowerCase()
      };

      site_page.create(newSite)
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
  static async createTopic(req, res, next) {
    try {
      const {
        title,
        site_page_id,
      } = req.body;

      const newTopic = {
        title: title,
        site_page_id: site_page_id,
        slug: slugify(title, {
          lower: true
        })
      };

      pvp_topic.create(newTopic)
        .then((response) => {
          successResponse(res, 200, 'topic', response)
        })
        .catch((error) => {
          console.log(error);
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
   * @memberof TopicController
   */
  static async updateTopic(req, res, next) {
    try {
      const {
        id
      } = req.query;

      return pvp_topic
        .findByPk(id, {
          topicAttr,
          include: [{
            model: pvp_subtopic,
            as: 'pvp_subtopics',
            attributes: subtopicAttr,
            include: [{
              model: article,
              as: 'articles',
              attributes: articleAttr,
            }]
          }]
        })
        .then(oneTopic => {
          if (!oneTopic) {
            return res.status(404).send({
              message: 'Topic Not Found',
            });
          } else {

            return oneTopic
              .update(req.body, {
                fields: Object.keys(req.body)
              }, {
                topicAttr,
              })
              .then((updatedTopic) => successResponse(res, 200, 'topic', updatedTopic)) // Send back the updated todo.
              .catch((error) => {
                errorResponse(res, 400, error)
              });
          }
        })
        .catch((error) => {
          res.status(400).send(error)
        });

    } catch (error) {

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
      } = req.body;

      const newSubtopic = {
        pvp_topic_id: pvp_topic_id,
        title: title,
        slug: slugify(title, {
          lower: true
        })
      };

      pvp_subtopic.create(newSubtopic)
        .then((response) => {
          successResponse(res, 200, 'subtopic', response);
        })
        .catch((error) => {
          console.log(error);
          errorResponse(res, 400, error);
        });

    } catch (error) {
      return next(error);
    }
  }


  /**
   * Removes a Topic
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * @returns {object}
   * @memberof TopicController
   */
  static async removeTopic(req, res, next) {
    try {
      const {
        id
      } = req.query;
      return pvp_topic
        .findByPk(id)
        .then(topicRes => {
          if (!topicRes) {
            errorResponse(res, 400, 'Topic Not Found');
          } else {
            return topicRes
              .destroy()
              .then(() => successResponse(res, 201, 'topics', 'Topic Successfully Deleted'))
              .catch(error => serverErrorResponsess());
          }
        })
        .catch(error => serverErrorResponsess());
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
  static async removeSubTopic(req, res, next) {
    try {
      const {
        id
      } = req.query;
      return pvp_subtopic
        .findByPk(id)
        .then(topicRes => {
          if (!topicRes) {
            errorResponse(res, 400, 'Sub Topic Not Found');
          } else {
            return topicRes
              .destroy()
              .then(() => successResponse(res, 201, 'subtopic', 'Sub Topic Successfully Deleted'))
              .catch(error => serverErrorResponsess());
          }
        })
        .catch(error => serverErrorResponsess());
    } catch (error) {
      return next(error);
    }
  }

}

module.exports = TopicController;