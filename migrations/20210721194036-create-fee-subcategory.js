'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('fee_subcategories', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          fee_category_id: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: 'fee_categories',
              key: 'id',
              as: 'fee_category_id'
            }
          },
          name: {
            type: Sequelize.STRING,
            unique: true
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
    return queryInterface.dropTable('fee_subcategories');
  }
};