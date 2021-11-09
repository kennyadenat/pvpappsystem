'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('faq_sites', [{
        id: "a62f555d-58cf-478c-a8c9-4693f6904c93",
        name: "support and contact",
      },
      {
        id: "af5386f8-04be-42c0-b785-4112a48a5d02",
        name: "plant variety protection",
      },
      {
        id: "1c327d1f-9a7d-44f5-824f-ce86e0c0e3d8",
        name: "payments and fees",
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('faq_sites', null, {});
  }
};