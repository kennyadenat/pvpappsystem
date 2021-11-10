'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('pvp_topics', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          title: {
            type: Sequelize.TEXT
          },
          site_page_id: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: 'site_pages',
              key: 'id',
              as: 'site_page_id'
            }
          },
          index: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          slug: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
          overview: {
            type: Sequelize.TEXT
          },
          status: {
            allowNull: false,
            type: Sequelize.ENUM('published', 'trash'),
            defaultValue: 'published',
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
    return queryInterface.dropTable('pvp_topics');
  }
};