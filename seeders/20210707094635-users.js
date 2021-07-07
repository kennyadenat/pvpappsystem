'use strict';
const authHelper = require('../helpers/authHelper');
const {
  hashPasswords
} = authHelper;


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('authors', [{
      email: 'kennyadenat09@gmail.com',
      password: hashPasswords('Iremide-09'),
      role: 'super_admin',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('authors', null, {});
  }
};