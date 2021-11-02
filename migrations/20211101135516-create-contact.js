'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('contacts', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          email: {
            type: Sequelize.STRING
          },
          fullname: {
            type: Sequelize.STRING
          },
          country: {
            type: Sequelize.STRING
          },
          subject: {
            type: Sequelize.STRING
          },
          message: {
            type: Sequelize.TEXT
          },
          responded: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          response: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: [],
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
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('contacts');
  }
};