const models = require('../models');
const serverResponse = require('../modules/serverResponse');
const paginate = require('../helpers/paginateHelper');
const paginateCount = require('../helpers/paginateCountHelper');

const {
  successResponse,
  errorResponse,
  serverErrorResponsess
} = serverResponse;

const {
  fee_category,
  fee_subcategory,
  fee
} = models;

const topicAttr = ['id', 'name'];
const subtopicAttr = ['id', 'fee_category_id', 'name'];
const subAttr = ['id', 'name'];
const feeAttr = [
  'id',
  'description',
  'fee_subcategory_id',
  'total',
  'currency',
  'additional',
  'charges',
];

class FeeController {


  static async getAllTopic(req, res, next) {
    try {
      return fee_category
        .findAll({
          order: [
            ['created_at', 'ASC'],
          ],
          attributes: topicAttr,
          include: [{
            model: fee_subcategory,
            as: 'fee_subcategories',
            attributes: subAttr
          }]
        })
        .then(response => {
          successResponse(res, 200, 'fee', response);
        })
        .catch(error => {
          errorResponse(res, 200, error);
        });

    } catch (error) {
      return next(error);
    }
  }


  static async getAllSubTopic(req, res, next) {
    try {
      const {
        id
      } = req.query;

      return fee_subcategory
        .findAll({
          where: {
            fee_category_id: id
          },
          order: [
            ['created_at', 'ASC'],
          ],
          attributes: subtopicAttr,
        })
        .then(response => {
          successResponse(res, 200, 'fee', response);
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
   * @returns {object} object
   * @memberof FeeController
   */
  static async createFee(req, res, next) {

    try {

      const {
        fee_subcategory_id,
        description,
        total,
        currency,
        additional,
        charges,
      } = req.body;

      const newFee = {
        fee_subcategory_id: fee_subcategory_id,
        description: description,
        total: total,
        currency: currency,
        additional: additional ? additional : [],
        charges: charges ? charges : [],
      };

      fee.create(newFee)
        .then((response) => {
          successResponse(res, 200, 'fee', response)
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
   * @memberof ArticleController
   */
  static async updateFee(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return fee
        .findByPk(id)
        .then(respFee => {
          if (!respFee) {
            errorResponse(res, 404, 'Fee not Found')
          }

          return respFee
            .update(req.body, {
              fields: Object.keys(req.body)
            }, {
              feeAttr
            })
            .then((response) => successResponse(res, 200, 'fee', response)) // Send back the updated todo.
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
   * @returns {object} object
   * @memberof FeeController
   */
  static async createTopic(req, res, next) {
    try {
      const {
        name
      } = req.body;

      const newTopic = {
        name: name
      };

      fee_category.create(newTopic)
        .then((response) => {
          successResponse(res, 200, 'fee', response)
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
   * @memberof FeeController
   */
  static async updateTopic(req, res, next) {
    try {
      const {
        id
      } = req.query;

      return fee_category
        .findByPk(id, {
          topicAttr,
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
              .then((updatedTopic) => successResponse(res, 200, 'fee', updatedTopic)) // Send back the updated todo.
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
   * @memberof FeeController
   */
  static async createSubtopic(req, res, next) {
    try {

      const {
        name,
        fee_category_id,
      } = req.body;

      const newSubtopic = {
        fee_category_id: fee_category_id,
        name: name,
      };

      fee_subcategory
        .create(newSubtopic)
        .then((response) => {
          successResponse(res, 200, 'fee', response);
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
   * @returns {object}
   * @memberof FeeController
   */
  static async updateSubTopic(req, res, next) {
    try {
      const {
        id
      } = req.query;

      return fee_subcategory
        .findByPk(id, {
          subtopicAttr,
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
              .then((updatedTopic) => successResponse(res, 200, 'fee', updatedTopic)) // Send back the updated todo.
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
   * Removes a Topic
   * @param {object} req 
   * @param {object} res 
   * @param {object} next 
   * @returns {object}
   * @memberof FeeController
   */
  static async removeTopic(req, res, next) {
    try {
      const {
        id
      } = req.query;

      return fee_category
        .findByPk(id)
        .then(topicRes => {
          if (!topicRes) {
            errorResponse(res, 400, 'Topic Not Found');
          } else {
            return topicRes
              .destroy()
              .then(() => successResponse(res, 201, 'fee', 'Topic Successfully Deleted'))
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
   * @memberof FeeController
   */
  static async removeSubTopic(req, res, next) {
    try {
      const {
        id
      } = req.query;

      return fee_subcategory
        .findByPk(id)
        .then(topicRes => {
          if (!topicRes) {
            errorResponse(res, 400, 'Sub Topic Not Found');
          } else {
            return topicRes
              .destroy()
              .then(() => successResponse(res, 201, 'fee', 'Sub Topic Successfully Deleted'))
              .catch(error => serverErrorResponsess());
          }
        })
        .catch(error => serverErrorResponsess());
    } catch (error) {
      return next(error);
    }
  }

}

module.exports = FeeController;