'use strict';
const authHelper = require('../helpers/authHelper');
const {
  hashPasswords
} = authHelper;


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('authors', [{
      email: 'kennyadenat09@gmail.com',
      password: hashPasswords('Iremide-09'),
      role: 'super_admin',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('authors', null, {});
  }
};