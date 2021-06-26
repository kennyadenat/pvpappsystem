'use strict';
module.exports = (sequelize, DataTypes) => {
  const site_name = sequelize.define('site_name', {
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  site_name.associate = function (models) {
    // associations can be defined here
    site_name.hasMany(models.category, {
      foreignKey: 'site_name_id',
      as: 'categories',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return site_name;
};