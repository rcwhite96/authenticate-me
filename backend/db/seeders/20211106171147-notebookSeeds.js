'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Notebooks', [

{
  userId: 1,
  title: 'Hats',
  createdAt: new Date(),
  updatedAt: new Date()
  },
  {
  userId: 1,
  title: 'Shawls',
  createdAt: new Date(),
  updatedAt: new Date()
  },
  {
  userId: 1,
  title: 'Socks',
  createdAt: new Date(),
  updatedAt: new Date()
  },
  {
  userId: 1,
  title: 'Home Decor',
  createdAt: new Date(),
  updatedAt: new Date()
  },

  ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Notebooks', null, {});

  }
};
