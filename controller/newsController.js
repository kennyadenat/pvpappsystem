const models = require('../models');
const slugify = require('slugify');
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

const cNews = [
  'id',
  'title',
  'slug',
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
  'status',
  'created_at',
  'updated_at'
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

      return blog
        .findAndCountAll({
          where: {
            blog_type: blog_type,
            status: 'published'
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
        header,
        tags,
        category_id,
        blog_type
      } = req.body;

      if (req.file) {
        multiUpload(res, req.file, (image) => {
          const {
            url
          } = image;

          const newContent = {
            authors_id: authors_id,
            title: title,
            body: body,
            header: url,
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
              console.log(error);
              errorResponse(res, 400, error)
            });
        });
      } else {

        const newContent = {
          authors_id: authors_id,
          title: title,
          body: body,
          header: header,
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
            console.log(error);
            errorResponse(res, 400, error)
          });
      }

    } catch (error) {
      console.log(error);
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

      const {
        id,
        title,
        body,
        read_time,
        status,
        header,
        tags,
        category_id,
      } = req.body;

      return blog
        .findByPk(id, {
          editPost
        })
        .then(oneBlog => {
          if (!oneBlog) {
            return res.status(404).send({
              message: 'Post Not Found',
            });
          } else {

            if (req.file) {

              // to remove the previous file??
              multiUpload(res, req.file, (image) => {
                const {
                  url
                } = image;

                const newContent = {
                  title: title,
                  body: body,
                  header: url,
                  read_time: read_time,
                  category_id: category_id,
                  status: status,
                  tags: tags ? JSON.parse(tags) : [],
                  slug: slugify(title, {
                    lower: true
                  })
                };

                return oneBlog
                  .update(newContent, {
                    fields: Object.keys(newContent)
                  }, {
                    editPost
                  })
                  .then((updatedBlog) => successResponse(res, 200, 'news', updatedBlog)) // Send back the updated todo.
                  .catch((error) => {
                    errorResponse(res, 400, error)
                  });

              });

            } else {

              const newContent = {
                title: title,
                body: body,
                header: header,
                read_time: read_time,
                category_id: category_id,
                status: status,
                tags: tags ? JSON.parse(tags) : [],
                slug: slugify(title, {
                  lower: true
                })
              };

              return oneBlog
                .update(newContent, {
                  fields: Object.keys(newContent)
                }, {
                  editPost
                })
                .then((updatedBlog) => successResponse(res, 200, 'news', updatedBlog)) // Send back the updated todo.
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
            blog_type: blog_type,
            status: 'published'
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


  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {function} next 
   * @returns {object}
   * @memberof NewsController
   */
  static async updateViews(req, res, next) {

    try {
      const {
        slug
      } = req.query;

      return blog
        .findOne({
          where: {
            slug: slug
          }
        })
        .then(oneBlog => {
          if (!oneBlog) {
            return res.status(404).send({
              message: 'Post Not Found',
            });
          } else {
            let read_count = oneBlog.dataValues.read_count;
            read_count = read_count + 1;

            const newContent = {
              read_count: read_count,
            };

            return oneBlog
              .update(newContent, {
                fields: Object.keys(newContent)
              }, {
                editPost
              })
              .then((updatedBlog) => successResponse(res, 200, 'news', updatedBlog)) // Send back the updated todo.
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
   * @memberof NewsController
   */
  static async getTrending(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return blog
        .findAll({
          limit: 10,
          where: {
            blog_type: id
          },
          order: [
            ['read_count', 'DESC'],
            ['created_at', 'DESC'],
            ['title', 'DESC'],
          ],
          attributes: allNews,
          include: [{
            model: category,
            as: 'categories',
            attributes: catAttr
          }],
        }).then((response) => {
          successResponse(res, 200, 'news', response)
        })
        .catch((error) => {
          errorResponse(res, 400, error)
        });;


    } catch (error) {
      return next(error);
    }
  }


  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {Function} next 
   * @memberof NewsController
   */
  static async getSimilar(req, res, next) {
    try {

      const {
        blog_type,
        id,
        category
      } = req.query;

      return blog
        .findAll({
          limit: 10,
          where: {
            blog_type: blog_type,
            [Op.or]: [{
              category_id: category
            }],
            id: {
              [Op.ne]: id
            }
          },
          order: [
            ['created_at', 'DESC'],
          ],
          attributes: allNews,
          include: [{
            model: models.category,
            as: 'categories',
            attributes: catAttr
          }],
        }).then((response) => {
          successResponse(res, 200, 'news', response)
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
   * @memberof NewsController
   */
  static async destroyNews(req, res, next) {
    const {
      id
    } = req.query;

    return blog
      .findByPk(id)
      .then(upBlog => {
        const newRes = {
          status: 'trash'
        };
        return upBlog
          .update(newRes, {
            fields: Object.keys(newRes)
          })
          .then((allRes) => {
            successResponse(res, 201, 'interview', '')
          }) // Send back the updated todo.

      });
  }

}

module.exports = NewsController;