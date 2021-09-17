'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('interviews', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          duration: {
            type: Sequelize.INTEGER
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
          read_count: {
            allowNull: false,
            type: Sequelize.INTEGER,
            defaultValue: 0,
          },
          title: {
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.TEXT
          },
          speaker: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: [],
          },
          topic: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: [],
          },
          video_url: {
            type: Sequelize.STRING
          },
          status: {
            allowNull: false,
            type: Sequelize.ENUM('draft', 'published', 'trash'),
            defaultValue: 'draft',
          },
          deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          interviewdate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
    return queryInterface.dropTable('interviews');
  }
};