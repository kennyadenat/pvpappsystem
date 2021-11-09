'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pvp_topics', [{
        id: "d9bccd55-ff9f-496b-a00c-37e7338f7934",
        title: "Understanding Plant Breeders Right",
        site_page_id: "860bc86f-7a71-4439-9d22-411e29294578",
        index: 1,
        slug: "understanding-plant-breeders-right",
        overview: ""
      },
      {
        id: "79879c35-ebb4-4ca4-839a-af5f27a02a76",
        title: "Applying for Plant Breeders Right",
        site_page_id: "860bc86f-7a71-4439-9d22-411e29294578",
        index: 2,
        slug: "applying-for-plant-breeders-right",
        overview: ""
      },
      {
        id: "529f3968-a921-473b-a6af-51f40c2c1828",
        title: "Managing your Plant Breeders Right",
        site_page_id: "860bc86f-7a71-4439-9d22-411e29294578",
        index: 3,
        slug: "managing-your-plant-breeders-right",
        overview: ""
      },
      {
        id: "fb0d0161-2e10-4ea3-a157-950f22fb4bb6",
        title: "Understanding Intellectual Property",
        site_page_id: "764d2a2c-b4d6-4f2d-807c-29ed4aa385d5",
        index: 4,
        slug: "understanding-intellectual-property",
        overview: ""
      },
      {
        id: "f27651d9-ab58-41c8-9c7c-659cf3c26414",
        title: "Types of Intellectual Property",
        site_page_id: "764d2a2c-b4d6-4f2d-807c-29ed4aa385d5",
        index: 5,
        slug: "types-of-intellectual-property",
        overview: ""
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pvp_topics', null, {});
  }
};