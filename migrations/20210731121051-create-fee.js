'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('fees', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          fee_subcategory_id: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: 'fee_subcategories',
              key: 'id',
              as: 'fee_subcategory_id'
            }
          },
          description: {
            type: Sequelize.TEXT
          },
          total: {
            type: Sequelize.INTEGER,
            defaultValue: 0
          },
          currency: {
            type: Sequelize.STRING,
            defaultValue: 'NGN'
          },
          additional: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: [],
          },
          charges: {
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
    return queryInterface.dropTable('fees');
  }
};