'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('attendees', {
          id: {
            allowNull: false,
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          email: {
            type: Sequelize.STRING
          },
          firstname: {
            type: Sequelize.STRING
          },
          lastname: {
            type: Sequelize.STRING
          },
          phone: {
            type: Sequelize.STRING
          },
          organization: {
            type: Sequelize.STRING
          },
          s_id: {
            type: Sequelize.STRING
          },
          state: {
            type: Sequelize.STRING
          },
          event_id: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: 'events',
              key: 'id',
              as: 'event_id'
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
    return queryInterface.dropTable('attendees');
  }
};