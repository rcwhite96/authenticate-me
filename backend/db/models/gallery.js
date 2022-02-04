'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('Gallery', {
    imageURL: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Gallery.associate = function(models) {
    Gallery.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Gallery;
};
