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

const { errorResponse, successResponse, serverErrorResponse } = serverResponse;

const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models");

class NotionController {
  /**
   * @static
   * Adds a new Posts
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   * @returns {object} Post body payload
   * @memberof NotionController
   */
  static async getNotionUsers(req, res, next) {
    try {
      //   const listUsersResponse = await notion.users.list({});
      //     console.log("users", listUsersResponse);

      const pageId = "59833787-2cf9-4fdf-8782-e53db20768a5";
      const response = await notion.pages.retrieve({ page_id: pageId });
      console.log(response);
      successResponse(res, 204, "posts", listUsersResponse);
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = NotionController;
