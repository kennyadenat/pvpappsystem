'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('pvp_subtopics', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
          },
          pvp_topic_id: {
            type: Sequelize.UUID,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: 'pvp_topics',
              key: 'id',
              as: 'pvp_topic_id'
            }
          },
          title: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          slug: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
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
    return queryInterface.dropTable('pvp_subtopics');
  }
};