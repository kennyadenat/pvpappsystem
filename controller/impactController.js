const models = require('../models');
const slugify = require('slugify');
const serverResponse = require('../modules/serverResponse');
const paginate = require('../helpers/paginateHelper');
const paginateCount = require('../helpers/paginateCountHelper');
const imageUploads = require('../helpers/imageUpload');
const fs = require('fs');

const {
  successResponse,
  errorResponse,
  serverErrorResponse
} = serverResponse;

const {
  impact
} = models;

const impactAttr = [
  'id',
  'header',
  'title',
  'description',
  'body',
  'imp_type',
  'story',
];


class ImpactController {

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns {array}
   * @memberof ImpactController
   */
  static async getAllImpact(req, res, next) {
    try {

      const {
        imp_type,
        page,
        size,
        search,
        filter
      } = req.query;

      impact
        .findAndCountAll({
          where: {
            imp_type: imp_type
          },
          order: [
            [`created_at`, 'ASC'],
          ],
          attributes: impactAttr,
          ...paginate({
            page,
            size
          }),
        }).then((response) => {
          successResponse(res, 200, 'impact', paginateCount(response, page, size))
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
   * @memberof ImpactController
   */
  static async createImpact(req, res, next) {

    try {

      const {
        title,
        body,
        description,
        imp_type,
        story,
      } = req.body;

      imageUploads(req.file, (image) => {
        if (image.err) {
          errorResponse(res, 400, 'Could not process your request')
          //   serverErrorResponsess('Could not process your request');
        } else {

          const newContent = {
            title: title,
            body: body,
            header: image.data,
            description: description,
            imp_type: imp_type,
            story: story ? JSON.parse(story) : []
          };

          impact
            .create(newContent)
            .then((response) => {
              successResponse(res, 200, 'impact', response)
            })
            .catch((error) => {
              errorResponse(res, 400, error)
            });
        }
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
   * @memberof ImpactController
   */
  static async updateImpact(req, res, next) {
    try {

      const {
        id,
        header,
        title,
        body,
        description,
        imp_type,
        story,
      } = req.body;

      return impact
        .findByPk(id, {
          impactAttr
        })
        .then(oneImpact => {
          if (!oneImpact) {
            return res.status(404).send({
              message: 'Impact Not Found',
            });
          } else {

            if (req.file) {

              // to remove the previous file??
              imageUploads(req.file, (image) => {
                if (image.err) {
                  errorResponse(res, 400, 'Could not process your request')
                  //   serverErrorResponsess('Could not process your request');
                } else {

                  const newContent = {
                    title: title,
                    body: body,
                    header: image.data,
                    read_time: read_time,
                    description: description,
                    imp_type: imp_type,
                    story: story ? JSON.parse(story) : [],
                  };

                  return oneImpact
                    .update(newContent, {
                      fields: Object.keys(newContent)
                    })
                    .then((updatedImpact) => successResponse(res, 200, 'impact', updatedImpact)) // Send back the updated todo.
                    .catch((error) => {
                      errorResponse(res, 400, error)
                    });

                }
              });

            } else {

              const newContent = {
                title: title,
                body: body,
                header: header,
                read_time: read_time,
                description: description,
                imp_type: imp_type,
                story: story ? JSON.parse(story) : [],
              };

              return oneImpact
                .update(newContent, {
                  fields: Object.keys(newContent)
                })
                .then((updatedImpact) => successResponse(res, 200, 'impact', updatedImpact)) // Send back the updated todo.
                .catch((error) => {
                  errorResponse(res, 400, error)
                });
            }
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
   * @param {function} next 
   * @returns {object}
   * @memberof ImpactController
   */
  static async getOneImpact(req, res, next) {

    try {

      const {
        id
      } = req.query;

      impact
        .findOne({
          where: {
            id: id
          },
          attributes: impactAttr,
        }).then((response) => {
          successResponse(res, 200, 'impact', response)
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
   * @memberof ImpactController
   */
  static async getPostEdit(req, res, next) {

    try {

      const {
        id
      } = req.query;

      return blog
        .findByPk(id, {
          order: [
            ['created_at', 'ASC'],
          ],
          attributes: editPost,
          include: [{
            model: category,
            as: 'categories',
            attributes: catAttr
          }],
        })
        .then(response => {
          if (!response) {
            errorResponse(res, 400, 'Impact Not Founds');
          } else {
            successResponse(res, 200, 'impact', response)
          }
        })
        .catch(error => errorResponse(res, 400, error));
    } catch (error) {

    }
  }

}

module.exports = ImpactController;