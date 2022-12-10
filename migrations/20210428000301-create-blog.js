'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('blogs', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          title: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          slug: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
          },
          category_id: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: 'categories',
              key: 'id',
              as: 'category_id'
            }
          },
          body: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: [],
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
          header: {
            type: Sequelize.STRING,
            defaultValue: 'http://res.cloudinary.com/dgniwrwip/image/upload/v1584245342/tqrfdrdjbtwrhokpbb1r.jpg'
          },
          read_time: {            
            type: Sequelize.INTEGER,
          },
          read_count: {            
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          blog_type: {
            allowNull: false,
            type: Sequelize.ENUM('blog', 'news'),
            defaultValue: 'blog',
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
            type: Sequelize.TEXT,
            defaultValue: 'http://res.cloudinary.com/dgniwrwip/image/upload/v1584245342/tqrfdrdjbtwrhokpbb1r.jpg',
          },
          tags: {
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
    return queryInterface.dropTable('blogs');
  }
};