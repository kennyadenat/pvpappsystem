'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('categories', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          title: {
            type: Sequelize.STRING
          },
          // infringement, ip, infringement
          resourcetype: {
            type: Sequelize.STRING
          },
          subcategory: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: [],
          },
          index: {
            type: Sequelize.INTEGER,
            defaultValue: 0
          },
          currentcount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          }
        });
      })

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  }
};