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
  docs,
  doctrack
} = models;

const {
  errorResponse,
  successResponse,
  serverErrorResponse
} = serverResponse;


function updateDocTracker(docs, object, res, response) {

}

class DocController {

  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof DocController
   */
  static async addDocs(req, res, next) {
    try {

      const oneDoc = await doctrack.findOne({
        where: {
          category: req.body.category
        },
        attributes: ['id', 'category', 'code', 'count'],
      });

      if (oneDoc) {
        const prevCount = oneDoc.dataValues.count + 1;
        const newFile = {
          title: req.body.title,
          category: req.body.category,
          url: req.body.url[0],
          code: 'PVPNG_0001'
        };

        newFile['code'] = oneDoc.dataValues.code + prevCount;
        const upTrack = {
          count: prevCount
        };

        oneDoc
          .update(upTrack, {
            fields: Object.keys(upTrack)
          });

        return docs
          .create(newFile)
          .then((response) => {
            successResponse(res, 204, 'docs', "processing successful");
          })
          .catch((error) => {
            serverErrorResponse(error, req, res, next);
          });

      } else {}

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
   * @memberof DocController
   */
  static async getDocs(req, res, next) {
    try {

      const {
        page,
        size,
        search,
        filter
      } = req.query;


      return docs
        .findAndCountAll({
          where: {
            [Op.or]: [{
              title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + search + '%'),
            }]
          },
          order: [
            ['created_at', 'DESC'],
          ],
          attributes: ['id', 'title', 'category', 'code', 'url', 'created_at'],
          ...pagination({
            page,
            size
          }),
        })
        .then(response => {
          successResponse(res, 200, 'docs', paginateCount(response, page, size));
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
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof DocController
   */
  static async getDoc(req, res, next) {
    try {

      return doctrack
        .findAll({
          order: [
            ['category', 'ASC'],
          ],
          attributes: ['id', 'category'],
        })
        .then(response => {
          successResponse(res, 200, 'docs', response)
        })
        .catch(error => {

          errorResponse(res, 400, error);
        });

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
   * @memberof DocController
   */
  static async removeDoc(req, res, next) {
    try {
      const {
        id
      } = req.query;

      return docs
        .findByPk(id)
        .then(docRes => {
          if (!docRes) {
            errorResponse(res, 400, 'Doc Not Found');
          }
          return docRes
            .destroy()
            .then(() => successResponse(res, 204, 'docs', 'Docs deleted successfully.'))
            .catch(error => {
              errorResponse(res, 400, error);
            });
        })
        .catch(error => {
          errorResponse(res, 400, error)
        });

    } catch (error) {
      return next(error);
    }
  }

}

module.exports = DocController;