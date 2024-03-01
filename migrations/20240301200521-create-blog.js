"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("blogs", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
          },
          title: {
            type: Sequelize.TEXT,
          },
          header: {
            type: Sequelize.TEXT,
            defaultValue: "",
          },
          // body: {
          //   // type, content, date,
          //   type: Sequelize.ARRAY(Sequelize.TEXT),
          //   defaultValue: [],
          // },
          comments: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: [],
          },
          tags: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: [],
          },
          slug: {
            type: Sequelize.STRING,
          },
          category: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: [],
          },
          blog_type: {
            //news, blogs
            type: Sequelize.STRING,
          },
          status: {
            type: Sequelize.ENUM("draft", "published", "trash"),
            defaultValue: "draft",
          },
          views: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          likes: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          blog_date: {
            type: Sequelize.STRING,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("blogs");
  },
};
