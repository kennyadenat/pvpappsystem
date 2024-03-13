const models = require("../models");
const paginateCount = require("../helpers/paginationHelper");
const pagination = require("../helpers/paginateHelper");
const serverResponse = require("../modules/serverResponse");
var slugify = require("slugify");
require("dotenv").config();

const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API,
});

const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models");

const { blog } = models;

const { errorResponse, successResponse, serverErrorResponse } = serverResponse;

function removeHTMLContent(content) {
  return content.replace(/(<([^>]+)>)/gi, "");
}

class BlogController {
  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof PostController
   */
  static async newBlog(req, res, next) {
    try {
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = BlogController;
