'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blogbody extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blogbody.init({
    blog_id: DataTypes.UUID,
    body: DataTypes.TEXT,
    blog_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'blogbody',
    underscored: true,
  });
  return blogbody;
};