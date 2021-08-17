const models = require('../models');
const serverResponse = require('../modules/serverResponse');
const paginate = require('../helpers/paginateHelper');
const paginateCount = require('../helpers/paginateCountHelper');

const {
  interview
} = models;


const interviewAttr = [
  'id',
  'header',
  'title',
  'description',
  'video_url',
  'updated_at',
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
   * @returns {array}
   * @memberof InterviewController
   */
  static async getInterviews(req, res, next) {
    try {

      const {
        imp_type,
        page,
        size,
        search,
        filter
      } = req.query;

      interview
        .findAndCountAll({
          where: {
            imp_type: imp_type
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

      const newContent = {
        title: title,
        duration: duration,
        interviewdate: interviewdate,
        header: 'https://pvpdescriptors.s3.us-east-2.amazonaws.com/news/Sun%20Jul%2018%202021%2002%3A19%3A01%20GMT%2B0100%20%28West%20Africa%20Standard%20Time%29irina-WZbJPdz42VM-unsplash.jpg',
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

      // imageUploads(req.file, (image) => {
      //   if (image.err) {
      //     errorResponse(res, 400, 'Could not process your request')
      //     //   serverErrorResponsess('Could not process your request');
      //   } else {

      //     const newContent = {
      //       title: title,
      //       duration: duration,
      //       interviewdate: interviewdate,
      //       header: image.data,
      //       description: description,
      //       video_url: video_url,
      //       speaker: speaker ? JSON.parse(speaker) : [],
      //       topic: topic ? JSON.parse(topic) : [],
      //       slug: slugify(title, {
      //         lower: true
      //       })
      //     };

      //     interview
      //       .create(newContent)
      //       .then((response) => {
      //         successResponse(res, 200, 'interview', response)
      //       })
      //       .catch((error) => {
      //         errorResponse(res, 400, error)
      //       });
      //   }
      // });

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
            id: id
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

}

module.exports = InterviewController;