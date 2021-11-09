'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pvp_subtopics', [{
        id: "ed4f403d-04d1-4f7f-a7b6-217cd4bbac4a",
        pvp_topic_id: "d9bccd55-ff9f-496b-a00c-37e7338f7934",
        title: "Basics of Plant Breeders Right",
        slug: "basics-of-plant-breeders-right",
        index: 1,
      },
      {
        id: "69faa734-b15b-40dd-a26a-6c51488699cd",
        pvp_topic_id: "d9bccd55-ff9f-496b-a00c-37e7338f7934",
        title: "Plant Breeders Rights in Details",
        slug: "plant-breeders-rights-in-details",
        index: 2,
      },
      {
        id: "6ad84453-3962-46fc-97e6-acf03ce1eb9b",
        pvp_topic_id: "d9bccd55-ff9f-496b-a00c-37e7338f7934",
        title: "Plant Breeders Right and other Intellectual Property Rights",
        slug: "plant-breeders-right-and-other-intellectual-property-rights",
        index: 3,
      },
      {
        id: "056cd442-e26f-4281-9604-b4bcb925ecab",
        pvp_topic_id: "79879c35-ebb4-4ca4-839a-af5f27a02a76",
        title: "Deciding if you need Plant Breeders Right",
        slug: "deciding-if-you-need-plant-breeders-right",
        index: 4,
      },
      {
        id: "03684e54-080a-4112-a54b-0fae9cd76283",
        pvp_topic_id: "79879c35-ebb4-4ca4-839a-af5f27a02a76",
        title: "Criteria for Protection",
        slug: "criteria-for-protection",
        index: 5,
      },
      {
        id: "822695bf-e301-426b-a523-4142caeb676d",
        pvp_topic_id: "79879c35-ebb4-4ca4-839a-af5f27a02a76",
        title: "Starting your Application",
        slug: "starting-your-application",
        index: 6,
      },
      {
        id: "6832add3-2b0b-45b1-9a8f-3edeae266264",
        pvp_topic_id: "79879c35-ebb4-4ca4-839a-af5f27a02a76",
        title: "Qualified Person and PVP Agents",
        slug: "qualified-person-and-pvp-agents",
        index: 7,
      },
      {
        id: "e3364f05-7ada-4f3e-9bfa-12397d39d973",
        pvp_topic_id: "79879c35-ebb4-4ca4-839a-af5f27a02a76",
        title: "Growing Trials",
        slug: "growing-trials",
        index: 8,
      },
      {
        id: "1699e859-8b91-41cb-9879-d8d42824da66",
        pvp_topic_id: "529f3968-a921-473b-a6af-51f40c2c1828",
        title: "Dealing with Oppositions",
        slug: "dealing-with-oppositions",
        index: 9,
      },
      {
        id: "0b302a3c-f51b-43ea-9ef1-bf33852be7c9",
        pvp_topic_id: "529f3968-a921-473b-a6af-51f40c2c1828",
        title: "International Plant Breeders Right",
        slug: "international-plant-breeders-right",
        index: 10,
      },
      {
        id: "874c0443-d282-481e-b6f0-ca471bb4341f",
        pvp_topic_id: "fb0d0161-2e10-4ea3-a157-950f22fb4bb6",
        title: "Overview",
        slug: "overview",
        index: 11,
      },
      {
        id: "52cbf7a2-f731-483f-8335-bc85213f3b5c",
        pvp_topic_id: "f27651d9-ab58-41c8-9c7c-659cf3c26414",
        title: "Types of Intellectual Property",
        slug: "types-of-intellectual-property",
        index: 12,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pvp_subtopics', null, {});
  }
};