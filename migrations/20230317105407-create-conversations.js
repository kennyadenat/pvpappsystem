'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conversations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      contact_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'contacts',
          key: 'id',
          as: 'contact_id'
        }
      },
      subject: {
        type: Sequelize.TEXT
      },
      message: {
        type: Sequelize.TEXT
      },
      sender: {
        type: Sequelize.STRING
      },
      recipient: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      read_date: {
        type: Sequelize.DATE,
      },
      delivery: {
        type: Sequelize.ENUM('outgoing', 'incoming'),
        defaultValue: 'outgoing'
      },
      status: {
        type: Sequelize.ENUM('marked', 'unmarked'),
        defaultValue: 'unmarked'
      },
      options: {
        type: Sequelize.ENUM('active', 'archived', 'trash'),
        defaultValue: 'active'
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
    await queryInterface.dropTable('conversations');
  }
};