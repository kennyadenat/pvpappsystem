'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('impacts', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          header: {
            type: Sequelize.STRING,
            defaultValue: ''
          },
          slug: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
          },
          title: {
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.TEXT
          },
          body: {
            type: Sequelize.TEXT
          },
          imp_type: {
            allowNull: false,
            type: Sequelize.ENUM('success', 'impact'),
            defaultValue: 'success',
          },
          status: {
            allowNull: false,
            type: Sequelize.ENUM('draft', 'published', 'trash'),
            defaultValue: 'draft',
          },
          story: {
            type: Sequelize.ARRAY(Sequelize.STRING),
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
    return queryInterface.dropTable('impacts');
  }
};