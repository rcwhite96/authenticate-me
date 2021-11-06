'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: "Users"}
      },
      notebookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model: "Notebooks"}
      },
      title: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      hookSize: {
        type: Sequelize.STRING(250)
      },
      needleSize: {
        type: Sequelize.STRING(250)
      },
      yarn: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Notes');
  }
};
