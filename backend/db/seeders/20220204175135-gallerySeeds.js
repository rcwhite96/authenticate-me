'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Galleries', [
      {
        userId: 1,
        imageURL: 'https://images4-g.ravelrycache.com/uploads/lprajogo/681357882/Fields_of_Clover_DSC03471_medium2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageURL: 'https://images4-g.ravelrycache.com/uploads/ExpressionFiber/786670972/0-15_medium2.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageURL: 'https://images4-f.ravelrycache.com/uploads/NimbleNim/638256608/3FC2455B-78A3-41A2-BACC-F73BD0279574_medium2.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageURL: 'https://images4-g.ravelrycache.com/uploads/NickisCrafts/803900413/_Cat_Crochet_Witch_Hat_Pattern-6_medium2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageURL: 'https://images4-f.ravelrycache.com/uploads/hollanddesigns/804881898/Pumpkin_medium2.JPG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageURL: 'https://images4-f.ravelrycache.com/uploads/theguywiththehook/684058508/IMG_1142_medium2.JPG',
        createdAt: new Date(),
        updatedAt: new Date()
      },


    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Galleries', null, {});

  }
};
