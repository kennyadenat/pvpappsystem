'use strict';
module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define('contact', {
    email: DataTypes.STRING,
    fullname: DataTypes.STRING,
    country: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.TEXT,
    responded: DataTypes.BOOLEAN,
    response: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    }
  }, {
    underscored: true,
  });
  contact.associate = function (models) {
    // associations can be defined here
  };
  return contact;
};