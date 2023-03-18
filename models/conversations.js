'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      conversations.belongsTo(models.contact, {
        foreignKey: 'contact_id',
        as: 'contacts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  conversations.init({
    contact_id: DataTypes.STRING,
    subject: DataTypes.TEXT,
    message: DataTypes.TEXT,
    sender: DataTypes.STRING,
    recipient: DataTypes.STRING,
    email: DataTypes.STRING,
    read: DataTypes.BOOLEAN,
    read_date: DataTypes.DATE,
    delivery: DataTypes.ENUM('outgoing', 'incoming'),
    status: DataTypes.ENUM('marked', 'unmarked'),
    options: DataTypes.ENUM('active', 'archived', 'trash'),
  }, {
    sequelize,
    modelName: 'conversations',
    underscored: true,
  });
  return conversations;
};