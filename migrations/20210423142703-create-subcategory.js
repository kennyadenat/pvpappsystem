'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('subcategories', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
          img_url: {
            type: Sequelize.STRING,
            defaultValue: ''
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
    return queryInterface.dropTable('subcategories');
  }
};