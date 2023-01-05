'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category.init({
    title: DataTypes.STRING,
    resourcetype: DataTypes.STRING,
    subcategory: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
    currentcount: DataTypes.INTEGER,
    index: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'category',
    underscored: true,
  });
  return category;
};