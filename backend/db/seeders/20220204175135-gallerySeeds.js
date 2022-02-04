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
      {
        userId: 1,
        imageURL: 'https://images4-f.ravelrycache.com/uploads/TwinkieChan/815531413/Crochet-Strawberry-Half-Finished-13_medium2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageURL: 'https://images4-g.ravelrycache.com/uploads/alisonknits/833756647/PrimaSoft-Trellis-0062_medium2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageURL: 'https://images4-f.ravelrycache.com/uploads/Tabisia/831084324/IMG_20220108_121112_medium2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageURL: 'https://images4-f.ravelrycache.com/uploads/beccamathilde/830388296/Becca_Parker_-_Boho_Rainbow_Blanket_-_WYS_Bo_Peep_Pure_2_medium2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        imageURL: 'https://images4-g.ravelrycache.com/uploads/CrazyNestLady/818567375/IMG_20201209_213235_medium2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },


    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Galleries', null, {});

  }
};
