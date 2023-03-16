'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.TEXT
      },
      message: {
        type: Sequelize.TEXT
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      // marked = treated, unmarked = untreated but not new, new = unmarked and not viewed
      status: {
        type: Sequelize.ENUM('marked', 'unmarked', 'new'),
        defaultValue: 'new'
      },
      options: {
        type: Sequelize.ENUM('active', 'archived', 'trash'),
        defaultValue: 'active'
      },
      /// fullname, message, date_sent, is_marked, is_archived, admin_name
      conversations: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        defaultValue: [],
      },
      date_treated: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('contacts');
  }
};