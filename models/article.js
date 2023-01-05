'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  article.init({
    title: DataTypes.STRING,
    categoryid: DataTypes.TEXT,
    body: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
  }, {
    sequelize,
    modelName: 'article',
    underscored: true,
  });
  return article;
};