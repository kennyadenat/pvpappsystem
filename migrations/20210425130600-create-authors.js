'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('authors', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
          role: {
            allowNull: false,
            type: Sequelize.ENUM('admin', 'super_admin'),
            defaultValue: 'admin',
          },
          strategy: {
            allowNull: false,
            type: Sequelize.ENUM('local', 'google', 'linkedin', 'twitter'),
            defaultValue: 'local',
          },
          avatar: {
            type: Sequelize.STRING,
            defaultValue: 'http://res.cloudinary.com/dgniwrwip/image/upload/v1584245342/tqrfdrdjbtwrhokpbb1r.jpg'
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false
          },
          last_login: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          firstname: {
            type: Sequelize.STRING,
            allowNull: false
          },
          lastname: {
            type: Sequelize.STRING,
            allowNull: false
          },
          email_notify: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
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
    return queryInterface.dropTable('authors');
  }
};