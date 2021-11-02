const models = require('../models');
const pagination = require('../helpers/paginateHelper');
const paginateCount = require('../helpers/paginateCountHelper');
const serverResponse = require('../modules/serverResponse');
const {
  Op,
  Sequelize
} = require("sequelize");
const {
  sequelize
} = require('../models');

const {
  successResponse,
  errorResponse
} = serverResponse;


const {
  contact
} = models;

/**
 * @exports
 * @class ObjectionController
 */
class ObjectionController {


  /**
   * @static
   * Returns paginated and filtered list of all Contacts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} returns paginated Contact data
   * @memberof ObjectionController
   */
  static async getContacts(req, res, next) {

    const {
      page,
      size,
      search,
      filter
    } = req.query;

    try {
      return contact
        .findAndCountAll({
          order: [
            ['updated_at', 'ASC'],
          ],
          attributes: contactAttribute,
          ...pagination({
            page,
            size
          }),
        })
        .then(contacts => {
          successResponse(res, 200, 'contact', paginateCount(contacts, page, size));
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
   * Adds a new Contact
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Contact body payload
   * @memberof ObjectionController
   */
  static async addContact(req, res, next) {

    try {

      return contact
        .create(req.body)
        .then(contacts => successResponse(res, 201, 'contact', contacts))
        .catch(error => {
          errorResponse(res, 400, error)
        });

    } catch (error) {
      return next(error);
    }

  }


  /**
   * @static
   * Destroy a Contact
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} destroys a Contact
   * @memberof ContactController
   */
  static async destroyContact(req, res, next) {
   
    try {
       const {
         id
       } = req.query;

       return contact
         .findByPk(id)
         .then(contactRes => {
           if (!contactRes) {
             errorResponse(res, 400, 'Contact Not Found');
           }
           return contactRes
             .destroy()
             .then(() => successResponse(res, 204, 'contact', 'Contact deleted successfully.'))
             .catch(error => {
               errorResponse(res, 400, error);
             });
         })
         .catch(error => errorResponse(res, 400, error));
    } catch (error) {
      return next(error);
    }

  }


}

module.exports = ObjectionController;