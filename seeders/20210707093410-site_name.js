'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('site_names', [{
        id: "80b3bbeb-8b13-425b-a13f-539d844bb2a8",
        name: "blog",
      },
      {
        id: "2a637e57-fcca-478f-8e64-93f5bd2343b8",
        name: "news",
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('site_names', null, {});
  }
};