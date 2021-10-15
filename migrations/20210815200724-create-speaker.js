'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('speakers', {
          id: {
            allowNull: false,
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
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
          name: {
            type: Sequelize.STRING
          },
          title: {
            type: Sequelize.STRING
          },
          avatar: {
            type: Sequelize.STRING
          },
          bio: {
            type: Sequelize.STRING
          },
          social: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: [],
          },
          role: {
            type: Sequelize.STRING
          },
          expertise: {
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
    return queryInterface.dropTable('speakers');
  }
};