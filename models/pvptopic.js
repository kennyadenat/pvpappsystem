"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class pvptopic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pvptopic.init(
    {
      categoryid: DataTypes.TEXT,
      status: DataTypes.ENUM("draft", "published", "trash"),
      body: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
      },
      title: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "pvptopic",
      underscored: true,
    }
  );
  return pvptopic;
};
