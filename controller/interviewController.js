const models = require('../models');
const serverResponse = require('../modules/serverResponse');
const paginate = require('../helpers/paginateHelper');
const paginateCount = require('../helpers/paginateCountHelper');
const slugify = require('slugify');
const imageUploads = require('../helpers/imageUpload');
const fs = require('fs');


const {
  interview
} = models;


const {
  Op,
  Sequelize
} = require("sequelize");
const {
  sequelize
} = require('../models');

const {
  successResponse,
  errorResponse,
  serverErrorResponsess
} = serverResponse;


const interviewAttr = [
  'id',
  'header',
  'title',
  'description',
  'interviewdate',
  'slug',
  'updated_at',
  'read_count'
];

const interviewOneAttr = [
  'id',
  'header',
  'title',
  'description',
  'duration',
  'speaker',
  'topic',
  'video_url',
  'interviewdate',
  'updated_at',
];


class InterviewController {

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns {array}
   * @memberof InterviewController
   */
  static async getAllInterview(req, res, next) {
    try {

      const {
        page,
        size,
        search,
        filter
      } = req.query;
      interview
        .findAndCountAll({
          where: {
            status: search
          },
          order: [
            [`created_at`, 'ASC'],
          ],
          attributes: interviewAttr,
          ...paginate({
            page,
            size
          }),
        }).then((response) => {
          successResponse(res, 200, 'interview', paginateCount(response, page, size))
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
   * @memberof InterviewController
   */
  static async getInterviews(req, res, next) {
    try {

      const {
        page,
        size,
        search,
        filter
      } = req.query;

      interview
        .findAndCountAll({
          where: {
            status: 'published'
          },
          order: [
            [`created_at`, 'ASC'],
          ],
          attributes: interviewAttr,
          ...paginate({
            page,
            size
          }),
        }).then((response) => {
          successResponse(res, 200, 'interview', paginateCount(response, page, size))
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
   * @memberof InterviewController
   */
  static async createInterview(req, res, next) {

    try {

      const {
        title,
        duration,
        description,
        video_url,
        speaker,
        interviewdate,
        topic
      } = req.body;

      imageUploads(req.file, (image) => {
        if (image.err) {
          errorResponse(res, 400, 'Could not process your request')
          //   serverErrorResponsess('Could not process your request');
        } else {
          const newContent = {
            title: title,
            duration: duration,
            interviewdate: interviewdate,
            header: image.data,
            description: description,
            video_url: video_url,
            speaker: speaker ? JSON.parse(speaker) : [],
            topic: topic ? JSON.parse(topic) : [],
            slug: slugify(title, {
              lower: true
            })
          };

          interview
            .create(newContent)
            .then((response) => {
              successResponse(res, 200, 'interview', response)
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
   * @memberof InterviewController
   */
  static async updateInterview(req, res, next) {
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

      return interview
        .findByPk(id, {
          interviewAttr
        })
        .then(oneInterview => {
          if (!oneInterview) {
            return res.status(404).send({
              message: 'Interview Not Found',
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

                  return oneInterview
                    .update(newContent, {
                      fields: Object.keys(newContent)
                    })
                    .then((updatedInterview) => successResponse(res, 200, 'interview', updatedInterview)) // Send back the updated todo.
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

              return oneInterview
                .update(newContent, {
                  fields: Object.keys(newContent)
                })
                .then((updatedInterview) => successResponse(res, 200, 'interview', updatedInterview)) // Send back the updated todo.
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
   * @memberof InterviewController
   */
  static async getOneInterview(req, res, next) {

    try {

      const {
        id
      } = req.query;

      interview
        .findOne({
          where: {
            slug: id
          },
          attributes: interviewOneAttr,
        }).then((response) => {
          successResponse(res, 200, 'interview', response)
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
   * @memberof InterviewController
   */
  static async updateViews(req, res, next) {

    try {
      const {
        slug
      } = req.query;

      return interview
        .findOne({
          where: {
            slug: slug
          }
        })
        .then(oneInterview => {
          if (!oneInterview) {
            return res.status(404).send({
              message: 'Interview Not Found',
            });
          } else {
            let read_count = oneInterview.dataValues.read_count;
            read_count = read_count + 1;

            const newContent = {
              read_count: read_count,
            };

            return oneInterview
              .update(newContent, {
                fields: Object.keys(newContent)
              })
              .then((updatedInter) => successResponse(res, 204, 'interview', 'Count Updated')) // Send back the updated todo.
              .catch((error) => {
                errorResponse(res, 400, error)
              });
          }

        })
        .catch((error) => {
          res.status(400).send(error)
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
   * @memberof InterviewController
   */
  static async getTrending(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return interview
        .findAll({
          limit: 10,
          order: [
            ['read_count', 'DESC'],
            ['created_at', 'DESC'],
            ['title', 'DESC'],
          ]
        }).then((response) => {
          successResponse(res, 200, 'interview', response)
        })
        .catch((error) => {
          errorResponse(res, 400, error)
        });;


    } catch (error) {
      return next(error);
    }
  }

  /**
   * @static
   * Destroy a Examination
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} destroys an Interview
   * @memberof InterviewController
   */
  static async destroyInterview(req, res, next) {
    const {
      id
    } = req.query;

    return interview
      .findByPk(id)
      .then(upInterview => {
        const newRes = {
          status: 'trash'
        };
        return upInterview
          .update(newRes, {
            fields: Object.keys(newRes)
          })
          .then((allRes) => {
            successResponse(res, 201, 'interview', '')
          }) // Send back the updated todo.

      });
  }


}

module.exports = InterviewController;