const models = require('../models');
const paginateCount = require('../helpers/paginationHelper');
const pagination = require('../helpers/paginateHelper');
const serverResponse = require('../modules/serverResponse');
var randomstring = require("randomstring");
var fs = require('fs');


const {
  Op,
  Sequelize
} = require("sequelize");
const {
  sequelize
} = require('../models');

const {
  subject,
  contact
} = models;

const {
  errorResponse,
  successResponse,
  serverErrorResponse
} = serverResponse;

class SupportController {

  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof SupportController
   */
  static async newSupport(req, res, next) {
    try {

      return contact
        .create(req.body)
        .then((response) => {
          successResponse(res, 200, 'support', response)
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
   * Gets All Template Category
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {array} Template Category
   * @memberof SupportController
   */
  static async getSubjects(req, res, next) {
    try {
      return subject
        .findAll({
          order: [
            ['title', 'ASC'],
          ],
          attributes: ['id', 'title', 'color'],
        })
        .then(response => {
          successResponse(res, 200, 'support', response)
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
   * @memberof SupportController
   */
  static async getSupportLists(req, res, next) {
    try {

      const {
        options,
        page,
        size,
        search,
        filter
      } = req.query;

      return contact
        .findAndCountAll({
          where: {
            options: options,
            [Op.or]: [{
              fullname: sequelize.where(sequelize.fn('LOWER', sequelize.col('fullname')), 'LIKE', '%' + search + '%'),
            }]
          },
          order: [
            ['created_at', 'ASC'],
          ],
          attributes: ['id', 'email', 'phone', 'fullname', 'subject', 'title', 'read', 'status', 'options', 'created_at'],
          ...pagination({
            page,
            size
          }),
        })
        .then(response => {
          successResponse(res, 200, 'support', paginateCount(response, page, size));
        })
        .catch(error => {
          console.log(error);
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
   * @memberof SupportController
   */
  static async readSupportMessage(req, res, next) {
    try {

      const {
        id
      } = req.query;

      const oneSupport = await contact.findOne({
        where: {
          id: id
        },
        attributes: ['id', 'email', 'fullname', 'subject', 'title', 'message', 'read', 'status', 'options', 'conversations', 'date_treated', 'created_at']
      });

      if (oneSupport.dataValues.read) {
        successResponse(res, 200, 'support', oneSupport);
      } else {

        const updateSupport = {
          read: true
        };
          
        return oneSupport
          .update(updateSupport, {
            fields: Object.keys(updateSupport)
          })
          .then((response) => {
            successResponse(res, 201, 'support', response);
          }) // Send back the updated todo.
          .catch((error) => {
            errorResponse(res, 400, 'There was an error processing your request');
          });

      }

    } catch (error) {
      return next(error);
    }
  }

}

module.exports = SupportController;