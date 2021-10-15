'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('events', {
          id: {
            allowNull: false,
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          title: {
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.STRING
          },
          start: {
            type: Sequelize.DATE
          },
          time: {
            type: Sequelize.STRING
          },
          end: {
            type: Sequelize.DATE
          },
          status: {
            type: Sequelize.ENUM('closed', 'started', 'loading', 'suspended')
          },
          type: {
            type: Sequelize.STRING
          },
          zoomlink: {
            type: Sequelize.STRING
          },
          header: {
            type: Sequelize.STRING,
            defaultValue: ''
          },
          share_url: {
            type: Sequelize.STRING
          },
          venue: {
            type: Sequelize.STRING
          },
          address: {
            type: Sequelize.STRING
          },
          duration: {
            type: Sequelize.INTEGER,
            defaultValue: 1
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
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('events');
  }
};