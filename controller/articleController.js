const models = require('../models');
const paginateCount = require('../helpers/paginationHelper');
const pagination = require('../helpers/paginateHelper');
const serverResponse = require('../modules/serverResponse');
var slugify = require('slugify');
const {
  v4: uuidv4
} = require('uuid');

const {
  Op,
  Sequelize
} = require("sequelize");
const {
  sequelize
} = require('../models');

const {
  category,
  resourcepost,
  article
} = models;

const {
  errorResponse,
  successResponse,
  serverErrorResponse
} = serverResponse;


class ArticleController {

  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof PostController
   */
  static async newCategory(req, res, next) {
    try {

      const oneCount = await resourcepost.findOne({
        where: {
          options: req.body.resourcetype
        },
        attributes: ['id', 'options', 'currentcount']
      });

      if (oneCount) {
        req.body.index = oneCount.dataValues.currentcount + 1;

        const upRes = {
          currentcount: oneCount.dataValues.currentcount + 1
        };

        oneCount
          .update(upRes, {
            fields: Object.keys(upRes)
          })

        return category
          .create(req.body)
          .then((response) => {
            successResponse(res, 200, 'article', response)
          })
          .catch((error) => {
            serverErrorResponse(error, req, res, next);
          });
      } else {

        const oneNewCount = {
          options: req.body.resourcetype,
          currentcount: 1
        };

        const newCount = await resourcepost.create(oneNewCount);
        req.body.index = 1;

        return category
          .create(req.body)
          .then((response) => {
            successResponse(res, 200, 'article', response)
          })
          .catch((error) => {
            serverErrorResponse(error, req, res, next);
          });

      }


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
   * @memberof PostController
   */
  static async getCategory(req, res, next) {
    try {

      const {
        resourcetype,
        page,
        size,
        search,
        filter
      } = req.query;

      return category
        .findAndCountAll({
          where: {
            resourcetype: resourcetype,
            [Op.or]: [{
              title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + search + '%'),
            }]
          },
          order: [
            ['index', 'ASC'],
          ],
          attributes: ['id', 'title', 'resourcetype', 'subcategory', 'index', 'created_at'],
          ...pagination({
            page,
            size
          }),
        })
        .then(response => {
          successResponse(res, 200, 'article', paginateCount(response, page, size));
        })
        .catch(error => {
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
   * @memberof PostController
   */
  static async updateCategory(req, res, next) {
    try {

      const oneCategory = await category.findOne({
        where: {
          id: req.body.id
        },
        attributes: ['id']
      });

      ///
      if (oneCategory) {
        return oneCategory
          .update(req.body, {
            fields: Object.keys(req.body)
          })
          .then((response) => {
            successResponse(res, 204, 'article', response);
          }) // Send back the updated todo.
          .catch((error) => {
            errorResponse(res, 400, 'There was an error processing your request');
          });

      } else {
        errorResponse(res, 400, 'The post does not exist or has been removed');
      }

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
   * @memberof PostController
   */
  static async getOneCategory(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return category
        .findOne({
          where: {
            id: id
          },
          attributes: ['id', 'subcategory']
        })
        .then(response => {
          successResponse(res, 200, 'article', response)
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
   * Gets All Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Posts body payload
   * @memberof PostController
   */
  static async removeCategory(req, res, next) {
    try {
      const {
        id
      } = req.query;

      return category
        .findByPk(id)
        .then(categoryRes => {
          if (!categoryRes) {
            errorResponse(res, 400, 'Category Not Found');
          }
          return categoryRes
            .destroy()
            .then(() => successResponse(res, 204, 'article', 'Category deleted successfully.'))
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

  /**
   * @static
   * Gets All Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Posts body payload
   * @memberof PostController
   */
  static async newSubCategory(req, res, next) {
    try {

      const oneCategory = await category.findOne({
        where: {
          id: req.body.categoryid
        },
        attributes: ['id', 'subcategory', 'currentcount']
      });

      if (oneCategory) {
        const items = {
          id: uuidv4(),
          categoryid: req.body.categoryid,
          title: req.body.title,
          index: oneCategory.dataValues.currentcount + 1
        };

        let newSubs = [];
        newSubs = oneCategory.dataValues.subcategory.push(JSON.stringify(items))

        // console.log('new subs', oneCategory.dataValues.subcategory);

        const updatedItems = {
          subcategory: oneCategory.dataValues.subcategory,
          currentcount: oneCategory.dataValues.currentcount + 1,
        };

        return oneCategory
          .update(updatedItems, {
            fields: Object.keys(updatedItems)
          })
          .then((response) => {
            successResponse(res, 200, 'article', response);
          }) // Send back the updated todo.
          .catch((error) => {
            console.log(error);
            errorResponse(res, 400, 'There was an error processing your request');
          });
      }

    } catch (error) {
      console.log(error);
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
   * @memberof PostController
   */
  static async getOneArticle(req, res, next) {

    try {

      const {
        id
      } = req.query;

      const oneArticle = await article.findOne({
        where: {
          categoryid: id
        },
        attributes: ['id', 'categoryid', 'status', 'body']
      });

      if (oneArticle) {
        successResponse(res, 200, 'article', oneArticle);
      } else {

        const items = {
          categoryid: id
        };

        return article
          .create(items)
          .then((response) => {
            successResponse(res, 200, 'article', response)
          })
          .catch((error) => {
            serverErrorResponse(error, req, res, next);
          });

      }

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
   * @memberof ArticleController
   */
  static async publishArticle(req, res, next) {
    try {    
      const oneArticle = await article.findOne({
        where: {
          id: req.body.id
        },
        attributes: ['id']
      });

      if (oneArticle) {
        const updatedArticle = {
          id: req.body.id,
          categoryid: req.body.isimage,
          status: req.body.status,
          body: req.body.body ? JSON.parse(req.body.body) : [],
        };

        return oneArticle
          .update(updatedArticle, {
            fields: Object.keys(updatedArticle)
          })
          .then((response) => {
            successResponse(res, 204, 'article', response);
          }) // Send back the updated todo.
          .catch((error) => {
            console.log(error);
            errorResponse(res, 400, 'There was an error processing your request');
          });

      } else {
        errorResponse(res, 400, 'The post does not exist or has been removed');
      }

    } catch (error) {
      console.log(error);
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
   * @memberof ArticleController
   */
  static async removeArticle(req, res, next) {
    try {
      const {
        id
      } = req.query;

      return category
        .findByPk(id)
        .then(categoryRes => {
          if (!categoryRes) {
            errorResponse(res, 400, 'Category Not Found');
          }
          return categoryRes
            .destroy()
            .then(() => successResponse(res, 204, 'article', 'Category deleted successfully.'))
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


  /**
   * @static
   * Gets All Template Category
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {array} Template Category
   * @memberof ArticleController
   */
  static async getAllCategory(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return category
        .findAll({
          where: {
            resourcetype: id
          },
          order: [
            ['index', 'ASC'],
          ],
          attributes: ['id', 'title', 'resourcetype', 'subcategory'],
        })
        .then(response => {
          successResponse(res, 200, 'article', response)
        })
        .catch(error => {
          errorResponse(res, 400, error);
        });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  }

  /**
   * @static
   * Gets All Template Category
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {array} Template Category
   * @memberof ArticleController
   */
  static async getArticleOne(req, res, next) {
    try {

      const {
        id
      } = req.query;

      return article
        .findOne({
          where: {
            categoryid: id
          },
          attributes: ['id', 'categoryid', 'status', 'body']
        })
        .then(response => {
          successResponse(res, 200, 'article', response)
        })
        .catch(error => {
          errorResponse(res, 400, error);
        });

    } catch (error) {
      return next(error);
    }
  }

}

module.exports = ArticleController;