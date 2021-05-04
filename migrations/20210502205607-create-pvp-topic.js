'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('pvp_topics', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          title: {
            type: Sequelize.STRING
          },
          thumbnail: {
            type: Sequelize.STRING,
            defaultValue: 'http://res.cloudinary.com/dgniwrwip/image/upload/v1584245342/tqrfdrdjbtwrhokpbb1r.jpg'
          },
          slug: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
          overview: {
            type: Sequelize.TEXT
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
    return queryInterface.dropTable('pvp_topics');
  }
};