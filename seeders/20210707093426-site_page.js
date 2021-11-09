'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('site_pages', [{
        id: "860bc86f-7a71-4439-9d22-411e29294578",
        name: "article",
      },
      {
        id: "764d2a2c-b4d6-4f2d-807c-29ed4aa385d5",
        name: "ip",
      },
      {
        id: "9bb413eb-9212-49ac-b6d5-9352b2ef3d7a",
        name: "infringement",
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('site_pages', null, {});
  }
};