'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('posts', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          image: {
            type: Sequelize.TEXT,            
          },
          isimage: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          title: {
            type: Sequelize.TEXT
          },
          slug: {
            type: Sequelize.TEXT
          },
          posttype: {
            type: Sequelize.STRING
          },
          status: {
            type: Sequelize.ENUM('draft', 'published', 'trash'),
            defaultValue: 'draft'
          },
          views: {
            type: Sequelize.INTEGER,
            defaultValue: 0
          },
          likes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
          },
          comments: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: [],
          },
          body: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
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
      })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};