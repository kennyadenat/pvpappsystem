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
            defaultValue: Sequelize.UUIDV4,
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
          },
          // fullname: {
          //   type: Sequelize.STRING,
          //   unique: true,
          //   allowNull: false
          // },
          role: {
            allowNull: false,
            type: Sequelize.ENUM('admin', 'super_admin'),
            defaultValue: 'admin',
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
          token: {
            type: Sequelize.STRING
          },
          email_notify: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
          },
          approved: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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