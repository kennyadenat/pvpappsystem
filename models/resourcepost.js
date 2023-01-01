'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resourcepost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  resourcepost.init({
    options: DataTypes.STRING,
    currentcount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'resourcepost',
    underscored: true,
  });
  return resourcepost;
};