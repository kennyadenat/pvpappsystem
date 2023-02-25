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
    slug: DataTypes.TEXT,
    posttype: DataTypes.STRING,
    status: DataTypes.ENUM('draft', 'published', 'trash'),
    views: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    // category: DataTypes.STRING,
    comments: DataTypes.STRING,
    body: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
  }, {
    sequelize,
    modelName: 'post',
    underscored: true,
  });
  return post;
};