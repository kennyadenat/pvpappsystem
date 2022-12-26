'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init({
    image: DataTypes.TEXT,
    isimage: DataTypes.BOOLEAN,
    title: DataTypes.TEXT,
    posttype: DataTypes.STRING,
    status: DataTypes.STRING,
    visibility: DataTypes.STRING,
    views: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    comments: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'post',
    underscored: true,
  });
  return post;
};