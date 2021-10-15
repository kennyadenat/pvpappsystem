'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('galleries', {
          id: {
            allowNull: false,
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          filename: {
            type: Sequelize.STRING
          },
          url: {
            type: Sequelize.STRING
          },
          media_type: {
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('galleries');
  }
};