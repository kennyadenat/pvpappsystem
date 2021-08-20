const models = require('../models');
const serverResponse = require('../modules/serverResponse');
const paginate = require('../helpers/paginateHelper');
const paginateCount = require('../helpers/paginateCountHelper');

const {
  gallery
} = models;

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
          attributes: interviewAttr,
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

}

module.exports = GalleryController;