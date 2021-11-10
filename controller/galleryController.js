const models = require('../models');
const serverResponse = require('../modules/serverResponse');
const paginate = require('../helpers/paginateHelper');
const paginateCount = require('../helpers/paginateCountHelper');
const imageUploads = require('../helpers/imageUpload');
const multiUpload = require('../helpers/multiUpload');
const fs = require('fs');
const {
  Op
} = require("sequelize");

const {
  gallery
} = models;

const galleryAttr = [
  'filename',
  'url',
  'media_type',
  'description',
  'updated_at',
];

const {
  successResponse,
  errorResponse,
  serverErrorResponse
} = serverResponse;

class GalleryController {

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns {array}
   * @memberof GalleryController
   */
  static async getAllGallery(req, res, next) {
    try {

      const {
        page,
        size,
        search,
        filter
      } = req.query;

      gallery
        .findAndCountAll({
          order: [
            [`created_at`, 'ASC'],
          ],
          attributes: galleryAttr,
          ...paginate({
            page,
            size
          }),
        }).then((response) => {
          successResponse(res, 200, 'gallery', paginateCount(response, page, size))
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
   * @returns {array}
   * @memberof GalleryController
   */
  static async getCollectibles(req, res, next) {
    try {

      const {
        id,
        page,
        size,
        search,
        filter
      } = req.query;

      gallery
        .findAndCountAll({
          where: {
            media_type: id
          },
          order: [
            [`created_at`, 'ASC'],
          ],
          attributes: galleryAttr,
          ...paginate({
            page,
            size
          }),
        }).then((response) => {
          successResponse(res, 200, 'gallery', paginateCount(response, page, size))
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
   * @returns {array}
   * @memberof GalleryController
   */
  static async getImages(req, res, next) {
    try {

      const {
        id,
        page,
        size,
        search,
        filter
      } = req.query;

      gallery
        .findAndCountAll({
          where: {
            [Op.or]: [{
              media_type: 'png'
            }, {
              media_type: 'jpeg'
            }, {
              media_type: 'JPG'
            }]
          },
          order: [
            [`created_at`, 'ASC'],
          ],
          attributes: galleryAttr,
          ...paginate({
            page,
            size
          }),
        }).then((response) => {
          successResponse(res, 200, 'gallery', paginateCount(response, page, size))
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
   * @returns {array}
   * @memberof GalleryController
   */
  static async uploadGallery(req, res, next) {
    try {

      const {
        filename,
        description,
      } = req.body;

      console.log('req', req.body);
      console.log('file', req.file);

      multiUpload(res, req.file, (image) => {
        const {
          url
        } = image;

        const newContent = {
          filename: filename,
          description: description,
          media_type: req.file.originalname.split('.').pop(),
          url: url,
        };

        gallery
          .create(newContent)
          .then((response) => {
            successResponse(res, 200, 'gallery', response)
          })
          .catch((error) => {
            errorResponse(res, 400, error)
          });
      });

    } catch (error) {

    }
  }

}

module.exports = GalleryController;