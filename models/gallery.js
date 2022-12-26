'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  gallery.init({
    name: DataTypes.TEXT,
    url: DataTypes.STRING,
    gallerytype: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'gallery',
    underscored: true,
  });
  return gallery;
};