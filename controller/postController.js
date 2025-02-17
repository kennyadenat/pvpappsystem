const models = require("../models");
const paginateCount = require("../helpers/paginationHelper");
const pagination = require("../helpers/paginateHelper");
const serverResponse = require("../modules/serverResponse");
var slugify = require("slugify");
const cloudinary = require("cloudinary").v2;
var fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const pageScrapper = require("page-scrapper");

require("dotenv").config();

const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API,
});

cloudinary.config({
  cloud_name: process.env.cloudname,
  api_key: process.env.cloudkey,
  api_secret: process.env.cloudsecret,
});

const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models");

const { blog } = models;

const { errorResponse, successResponse, serverErrorResponse } = serverResponse;

function removeHTMLContent(content) {
  return content.replace(/(<([^>]+)>)/gi, "");
}

function returnPublicId(url) {
  return url.match(/\/([^\/]+)\.png$/)[1];
}

class PostController {
  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof PostController
   */
  static async newPosts(req, res, next) {
    try {
      const dates = new Date();
      const newPosts = {
        title: `${req.body.post}-${dates.toISOString()}`,
        posttype: req.body.post,
        status: "draft",
      };

      return blog
        .create(newPosts)
        .then((response) => {
          successResponse(res, 200, "posts", response);
        })
        .catch((error) => {
          serverErrorResponse(error, req, res, next);
        });
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
   * @memberof PostController
   */
  static async publishPosts(req, res, next) {
    try {
      const onePost = await blog.findOne({
        where: {
          id: req.body.id,
        },
        attributes: ["id"],
      });

      ///
      if (onePost) {
        req.body.slug = slugify(req.body.title, {
          lower: true,
        });

        // const oneBody = JSON.parse(req.body.body)
        // const stripped = removeHTMLContent(oneBody[0].body);

        const updatedPost = {
          id: req.body.id,
          title: req.body.title,
          slug: req.body.slug,
          summary: req.body.summary,
          category: req.body.category,
          posttype: req.body.posttype,
          postdate: req.body.postdate,
          status: req.body.status,
          tags: req.body.tags ? JSON.parse(req.body.tags) : [],
          body: req.body.body ? JSON.parse(req.body.body) : [],
        };

        return onePost
          .update(updatedPost, {
            fields: Object.keys(updatedPost),
          })
          .then((response) => {
            successResponse(res, 200, "posts", response);
          }) // Send back the updated todo.
          .catch((error) => {
            errorResponse(
              res,
              400,
              "There was an error processing your request"
            );
          });
      } else {
        errorResponse(res, 400, "The post does not exist or has been removed");
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
  static async getAllPosts(req, res, next) {
    try {
      const { posttype, page, size, search, filter } = req.query;
      return blog
        .findAndCountAll({
          where: {
            status: "published",
            posttype: posttype,
            [Op.or]: [
              {
                title: sequelize.where(
                  sequelize.fn("LOWER", sequelize.col("title")),
                  "LIKE",
                  "%" + search + "%"
                ),
              },
            ],
          },
          order: [["created_at", "DESC"]],
          attributes: [
            "id",
            "title",
            "summary",
            "image",
            "isimage",
            "posttype",
            "status",
            "postdate",
            "slug",
            "category",
          ],
          ...pagination({
            page,
            size,
          }),
        })
        .then((response) => {
          successResponse(
            res,
            200,
            "posts",
            paginateCount(response, page, size)
          );
        })
        .catch((error) => {
          serverErrorResponse(error, req, res, next);
        });
    } catch (error) {
      console.log(error);
      serverErrorResponse(error, req, res, next);
      // return next(error);
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
  static async getPosts(req, res, next) {
    try {
      const { posttype, page, size, search, filter } = req.query;

      return blog
        .findAndCountAll({
          where: {
            posttype: posttype,
            [Op.or]: [
              {
                title: sequelize.where(
                  sequelize.fn("LOWER", sequelize.col("title")),
                  "LIKE",
                  "%" + search + "%"
                ),
              },
            ],
          },
          order: [["created_at", "ASC"]],
          attributes: [
            "id",
            "title",
            "summary",
            "image",
            "isimage",
            "posttype",
            "status",
            "postdate",
          ],
          ...pagination({
            page,
            size,
          }),
        })
        .then((response) => {
          successResponse(
            res,
            200,
            "posts",
            paginateCount(response, page, size)
          );
        })
        .catch((error) => {
          serverErrorResponse(error, req, res, next);
        });
    } catch (error) {
      serverErrorResponse(error, req, res, next);
      // return next(error);
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
  static async getOnePosts(req, res, next) {
    try {
      const { id } = req.query;

      return blog
        .findOne({
          where: {
            id: id,
          },
        })
        .then((response) => {
          successResponse(res, 200, "posts", response);
        })
        .catch((error) => {
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
  static async getOneSlug(req, res, next) {
    try {
      const { id } = req.query;

      return blog
        .findOne({
          where: {
            slug: id,
          },
        })
        .then((response) => {
          successResponse(res, 200, "posts", response);
        })
        .catch((error) => {
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
  static async removePost(req, res, next) {
    try {
      const { id } = req.query;

      return blog
        .findByPk(id)
        .then((postRes) => {
          if (!postRes) {
            errorResponse(res, 400, "Post Not Found");
          }
          return postRes
            .destroy()
            .then(() =>
              successResponse(res, 204, "posts", "Post deleted successfully.")
            )
            .catch((error) => {
              errorResponse(res, 400, error);
            });
        })
        .catch((error) => {
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
   * @memberof PostController
   */
  static async uploadBackgroundImage(req, res, next) {
    try {
      const findOneImage = await blog.findByPk(req.body.id, {
        attributes: ["id", "image", "isimage"],
      });

      if (findOneImage) {
        const options = {
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        };

        cloudinary.uploader.upload(req.file.path, options).then((result) => {
          if (result) {
            const imageUrl = {
              image: result.secure_url,
              isimage: true,
            };

            const updatedPost = findOneImage.update(imageUrl, {
              fields: Object.keys(imageUrl),
            });

            fs.unlinkSync(req.file.path);
            successResponse(res, 200, "posts", updatedPost);
          }
        });
      } else {
        // return error message  not found
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
  static async addPostImage(req, res, next) {
    try {
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };

      cloudinary.uploader.upload(req.file.path, options).then((result) => {
        if (result) {
          const imageUrl = {
            options: "valid",
            body: result.secure_url,
            index: uuidv4(),
            option: "image",
          };

          fs.unlinkSync(req.file.path);

          successResponse(res, 200, "posts", imageUrl);
        } else {
          console.log("yucks");
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  static async extractUrl(req, res, next) {
    try {
      const data = await pageScrapper("https://seedcouncil.gov.ng/");
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = PostController;
