'use strict';
module.exports = (sequelize, DataTypes) => {
  const partner = sequelize.define('partner', {
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    link: DataTypes.STRING,
    profile: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    underscored: true,
  });
  partner.associate = function(models) {
    // associations can be defined here
  };
  return partner;
};