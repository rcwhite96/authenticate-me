'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Notes', [
        {
          userId: 1,
          notebookId: 1,
          title: "Slouchy Beanie",
          hookSize: "4.5mm",
          yarn: "Malabrigo Rios in Green",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
          userId: 1,
          notebookId: 1,
          title: "Mushroom Bucket Hat",
          hookSize: "5.5mm",
          yarn: "Chunky Red Yarn, Cotton",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
          userId: 1,
          notebookId: 2,
          title: "Dragon Scale Shawl",
          hookSize: "3.5mm",
          yarn: "Sport weight yarn in grey",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
          userId: 1,
          notebookId: 2,
          title: "Lace Shawl",
          hookSize: "2.5mm",
          yarn: "Lace weight yarn in blue",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
          userId: 1,
          notebookId: 3,
          title: "Over The Knee Socks",
          hookSize: "3.0mm",
          yarn: "Sock weight variegated yarn",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
          userId: 1,
          notebookId: 3,
          title: "Chunky Slippers",
          hookSize: "6.0mm",
          yarn: "Chunky yarn in pink",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
          userId: 1,
          notebookId: 4,
          title: "Basket",
          hookSize: "5.0mm",
          yarn: "Worset weight acrylic yarn in purple",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
          userId: 1,
          notebookId: 4,
          title: "Basket",
          hookSize: "5.0mm",
          yarn: "Worset weight acrylic yarn in purple",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          createdAt: new Date(),
          updatedAt: new Date()
          },
          {
          userId: 1,
          notebookId: 4,
          title: "Lace Curtains",
          hookSize: "2.0mm",
          yarn: "White lace weight yarn",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          createdAt: new Date(),
          updatedAt: new Date()
          },
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Notes', null, {});

  }
};
