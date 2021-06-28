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
  serverErrorResponsess
} = serverResponse;

const {
  blog
} = models;

class NewsController {

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns object
   * @memberof NewsController
   */
  static async createNews(req, res, next) {

    try {

      const {
        authors_id,
        title,
        body,
        read_time,
        status,
        tags,
        category_id,
        blog_type
      } = req.body;

      console.log(tags);

      console.log(JSON.parse(tags));

      imageUploads(req.file, (image) => {
        if (image.err) {
          console.log(image.err);
          errorResponse(res, 400, 'Could not process your request')
          //   serverErrorResponsess('Could not process your request');
        } else {

          const newContent = {
            authors_id: authors_id,
            title: title,
            body: body,
            header: image.data,
            read_time: read_time,
            blog_type: blog_type,
            category_id: category_id,
            status: status,
            tags: tags ? JSON.parse(tags) : [],
            slug: slugify(title, {
              lower: true
            })
          };

          console.log({
            newContent
          })

          blog.create(newContent)
            .then((response) => {
              successResponse(res, 200, blog_type, response)
            })
            .catch((error) => {
              console.log(error);
              errorResponse(res, 400, error)
            });
        }
      });

    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

}

module.exports = NewsController;