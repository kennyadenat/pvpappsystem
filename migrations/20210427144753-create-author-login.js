'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('author_logins', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          authors_id: {
            type: Sequelize.STRING
          },
          ip_address: {
            type: Sequelize.STRING
          },
          user_agent: {
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
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('author_logins');
  }
};