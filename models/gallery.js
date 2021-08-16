'use strict';
module.exports = (sequelize, DataTypes) => {
  const gallery = sequelize.define('gallery', {
    filename: DataTypes.STRING,
    url: DataTypes.STRING,
    media_type: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    underscored: true,
  });
  gallery.associate = function(models) {
    // associations can be defined here
  };
  return gallery;
};