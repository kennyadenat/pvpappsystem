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
      contact.hasMany(models.conversations, {
        foreignKey: 'contact_id',
        as: 'conversations',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  contact.init({
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    fullname: DataTypes.STRING,
    country: DataTypes.STRING,
    subject: DataTypes.STRING,
    title: DataTypes.STRING,
    message: DataTypes.TEXT,
    read: DataTypes.BOOLEAN,
    status: DataTypes.ENUM('marked', 'unmarked'),
    options: DataTypes.ENUM('active', 'archived', 'trash'),
    date_treated: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'contact',
    underscored: true,
  });
  return contact;
};