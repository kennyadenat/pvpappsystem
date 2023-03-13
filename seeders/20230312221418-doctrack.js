'use strict';
const randomstring = require("randomstring");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('doctracks', [{
      category: 'technical guidelines',
      code: 'PVPNG_TGS_',
    }, {
      category: 'administrative',
      code: 'PVPNG_ADM_',
    }, {
      category: 'gazzette',
      code: 'PVPNG_GAZ_',
    }, {
      category: 'policy',
      code: 'PVPNG_POL_',
    }], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('doctracks');
  }
};