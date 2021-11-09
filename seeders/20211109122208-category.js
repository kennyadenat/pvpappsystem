'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [{
        id: "1f5d2436-919e-4f5f-bc76-34b2a09395a1",
        title: "general",
        site_name_id: "2a637e57-fcca-478f-8e64-93f5bd2343b8",
      },
      {
        id: "a4037e79-eb3c-4a73-906b-d301ed4d2d9d",
        title: "plant variety protection",
        site_name_id: "80b3bbeb-8b13-425b-a13f-539d844bb2a8",
      },
      {
        id: "d631964d-0d03-400d-a1ec-62616c1c5435",
        title: "entrepreneur",
        site_name_id: "80b3bbeb-8b13-425b-a13f-539d844bb2a8",
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};