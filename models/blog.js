"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blog.init(
    {
      title: DataTypes.TEXT,
      header: DataTypes.TEXT,
      // body: {
      //   type: DataTypes.ARRAY(DataTypes.TEXT),
      //   defaultValue: [],
      // },
      comments: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
      },
      slug: DataTypes.STRING,
      category: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
      },
      blog_type: DataTypes.STRING,
      status: DataTypes.ENUM("draft", "published", "trash"),
      views: DataTypes.INTEGER,
      likes: DataTypes.INTEGER,
      blog_date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "blog",
      underscored: true,
    }
  );
  return blog;
};
