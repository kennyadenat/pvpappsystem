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
    message: DataTypes.TEXT,
    sender: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'conversations',
    underscored: true,
  });
  return conversations;
};