'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contact.init({
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    fullname: DataTypes.STRING,
    country: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.TEXT,
    date_treated: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'contact',
    underscored: true,
  });
  return contact;
};