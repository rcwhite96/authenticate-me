'use strict';

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    userId: DataTypes.INTEGER,
    notebookId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    hookSize: DataTypes.STRING,
    needleSize: DataTypes.STRING,
    yarn: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    Note.belongsTo(models.Notebook, {
      foreignKey:' notebookId'
    })
  };
  return Note;
};
