'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('docs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('active', 'trash'),
        defaultValue: 'active'
      },
      url: {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('docs');
  }
};