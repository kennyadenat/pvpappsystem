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
  blog,
  category,
  authors
} = models;

const oneNews = [
  'id',
  'title',
  'header',
  'slug',
  'created_at'
];

const allNews = [
  'id',
  'title',
  'header',
  'body',
  'slug',
  'read_time',
  'read_count',
  'blog_type',
  'up_vote',
  'down_vote',
  'tags',
  'status',
  'created_at'
];

const catAttr = [
  'id',
  'title'
];

const onePost = [
  'id',
  'title',
  'header',
  'body',
  'slug',
  'read_time',
  'read_count',
  'blog_type',
  'up_vote',
  'down_vote',
  'tags',
  'created_at'
];

const editPost = [
  'id',
  'title',
  'header',
  'body',
  'read_time',
  'blog_type',
  'tags',
  'status',
];

const authorAttr = [
  'email',
  'avatar'
];

class NewsController {

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns {array}
   * @memberof NewsController
   */
  static async getAllNews(req, res, next) {
    try {

      const {
        blog_type,
        page,
        size,
        search,
        filter
      } = req.query;

      blog
        .findAndCountAll({
          where: {
            blog_type: blog_type
          },
          order: [
            [`created_at`, 'ASC'],
          ],
          attributes: allNews,
          include: [{
            model: category,
            as: 'categories',
            attributes: catAttr
          }],
          ...paginate({
            page,
            size
          }),
        }).then((response) => {
          successResponse(res, 200, 'news', paginateCount(response, page, size))
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

      imageUploads(req.file, (image) => {
        if (image.err) {
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

          blog.create(newContent)
            .then((response) => {
              successResponse(res, 200, blog_type, response)
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
   * @memberof NewsController
   */
  static async updateNews(req, res, next) {
    try {

      console.log('body', req.body);

      console.log('file', req.file);

    } catch (error) {

    }
  }


  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns {array}
   * @memberof NewsController
   */
  static async getLandingItems(req, res, next) {

    try {

      const {
        blog_type,
        page,
        size,
        search,
        filter
      } = req.query;

      blog
        .findAndCountAll({
          where: {
            blog_type: blog_type
          },
          order: [
            [`created_at`, 'ASC'],
          ],
          attributes: oneNews,
          include: [{
            model: category,
            as: 'categories',
            attributes: catAttr
          }],
          ...paginate({
            page,
            size
          }),
        }).then((response) => {
          successResponse(res, 200, 'news', paginateCount(response, page, size))
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
   * @memberof NewsController
   */
  static async getOnePost(req, res, next) {

    try {

      const {
        slug
      } = req.query;

      blog.findOne({
          where: {
            slug: slug
          },
          attributes: onePost,
          include: [{
            model: category,
            as: 'categories',
            attributes: catAttr
          }, {
            model: authors,
            as: 'authors',
            attributes: authorAttr
          }]
        }).then((response) => {
          successResponse(res, 200, 'news', response)
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
   * @memberof NewsController
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
            errorResponse(res, 400, 'Post Not Founds');
          } else {
            successResponse(res, 200, 'news', response)
          }
        })
        .catch(error => errorResponse(res, 400, error));
    } catch (error) {

    }
  }

}

module.exports = NewsController;