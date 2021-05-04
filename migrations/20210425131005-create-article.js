'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('articles', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          title: {
            type: Sequelize.TEXT
          },
          slug: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
          },
          article_subcategory_id: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: 'subcategories',
              key: 'id',
              as: 'article_subcategory_id'
            }
          },
          body: {
            type: Sequelize.TEXT
          },
          header: {
            type: Sequelize.STRING,
            defaultValue: ''
          },
          authors_id: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: 'authors',
              key: 'id',
              as: 'authors_id'
            }
          },
          read_time: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          read_count: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          status: {
            allowNull: false,
            type: Sequelize.ENUM('draft', 'published', 'trash'),
            defaultValue: 'draft',
          },
          up_vote: {
            type: Sequelize.INTEGER,
            defaultValue: 0
          },
          down_vote: {
            type: Sequelize.INTEGER,
            defaultValue: 0
          },
          thumbnail: {
            allowNull: false,
            type: Sequelize.STRING,
            defaultValue: '',
          },
          tagsList: {
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
    return queryInterface.dropTable('articles');
  }
};