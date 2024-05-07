const models = require("../models");
const paginateCount = require("../helpers/paginationHelper");
const pagination = require("../helpers/paginateHelper");
const serverResponse = require("../modules/serverResponse");
var randomstring = require("randomstring");
var fs = require("fs");

const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models");

const { docs, doctrack } = models;

const { errorResponse, successResponse, serverErrorResponse } = serverResponse;

const imageUploads = require("../helpers/imageUpload");

class DocController {
  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof DocController
   */
  static async addDocs(req, res, next) {
    try {
      const oneDoc = await doctrack.findOne({
        where: {
          category: req.body.category,
        },
        attributes: ["id", "category", "code", "count"],
      });

      imageUploads(req.file, (image) => {
        if (image.err) {
          errorResponse(res, 400, "Could not process your request");
        } else {
          if (oneDoc) {
            const prevCount = oneDoc.dataValues.count + 1;
            const newFile = {
              title: req.body.title,
              category: req.body.category,
              url: image.data,
              code: "PVPNG_0001",
            };

            newFile["code"] = oneDoc.dataValues.code + prevCount;
            const upTrack = {
              count: prevCount,
            };

            oneDoc.update(upTrack, {
              fields: Object.keys(upTrack),
            });

            return docs
              .create(newFile)
              .then((response) => {
                successResponse(res, 204, "docs", "processing successful");
              })
              .catch((error) => {
                serverErrorResponse(error, req, res, next);
              });
          } else {
          }
        }
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
   * @memberof DocController
   */
  static async updateDocs(req, res, next) {
    try {
      const oneDoc = await docs.findOne({
        where: {
          id: req.body.id,
        },
        attributes: ["id", "category"],
      });

      if (oneDoc) {
        const updateFile = {
          title: req.body.title,
          category: req.body.category,
          url: req.body.url[0],
        };

        if (req.body.isimage === "true") {
          imageUploads(req.file, (image) => {
            if (image.err) {
              errorResponse(res, 400, "Could not process your request");
            } else {
              updateFile["url"] = image.data;
            }
          });
        } else {
          updateFile["url"] = req.body.url;
        }

        if (oneDoc.dataValues.category === req.body.category) {
          updateFile["code"] = req.body.code;
        } else {
          const oneTrack = await doctrack.findOne({
            where: {
              category: req.body.category,
            },
            attributes: ["id", "category", "code", "count"],
          });
          const prevCount = oneTrack.dataValues.count + 1;
          updateFile["code"] = oneTrack.dataValues.code + prevCount;
        }
        return oneDoc
          .update(updateFile, {
            fields: Object.keys(updateFile),
          })
          .then((response) => {
            successResponse(res, 200, "posts", response);
          });
      } else {
        errorResponse(res, 400, "Document not found");
      }
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
   * @memberof DocController
   */
  static async getAllDocs(req, res, next) {
    try {
      const { category, page, size, search, filter } = req.query;

      return docs
        .findAndCountAll({
          where: {
            category: category,
            status: "active",
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
          attributes: ["id", "title", "category", "code", "url", "created_at"],
          ...pagination({
            page,
            size,
          }),
        })
        .then((response) => {
          successResponse(
            res,
            200,
            "docs",
            paginateCount(response, page, size)
          );
        })
        .catch((error) => {
          console.log(error);
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
   * @memberof DocController
   */
  static async getDocs(req, res, next) {
    try {
      const { page, size, search, filter } = req.query;

      return docs
        .findAndCountAll({
          where: {
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
            "category",
            "status",
            "code",
            "url",
            "created_at",
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
            "docs",
            paginateCount(response, page, size)
          );
        })
        .catch((error) => {
          console.log(error);
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
   * @memberof DocController
   */
  static async getDoc(req, res, next) {
    try {
      return doctrack
        .findAll({
          order: [["category", "ASC"]],
          attributes: ["id", "category"],
        })
        .then((response) => {
          successResponse(res, 200, "docs", response);
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
   * @memberof DocController
   */
  static async removeDoc(req, res, next) {
    try {
      const { id } = req.query;

      return docs
        .findByPk(id)
        .then((docRes) => {
          if (!docRes) {
            errorResponse(res, 400, "Doc Not Found");
          }
          return docRes
            .destroy()
            .then(() => {
              const path = "./public/docs/" + docRes.dataValues.url;
              fs.unlink(path, (err) => {
                if (err) {
                  console.log(err);
                }
              });
              successResponse(res, 204, "docs", "Docs deleted successfully.");
            })
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
}

module.exports = DocController;
