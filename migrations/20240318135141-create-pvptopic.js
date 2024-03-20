"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable("pvptopics", {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal("uuid_generate_v4()"),
          },
          categoryid: {
            type: Sequelize.TEXT,
          },
          status: {
            type: Sequelize.ENUM("draft", "published", "trash"),
            defaultValue: "draft",
          },
          title: {
            type: Sequelize.TEXT,
          },
          body: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: [],
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
    await queryInterface.dropTable("pvptopics");
  },
};
