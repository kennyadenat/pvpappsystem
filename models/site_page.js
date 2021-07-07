'use strict';
module.exports = (sequelize, DataTypes) => {
  // this is for the articles
  const site_page = sequelize.define('site_page', {
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  site_page.associate = (models) => {
    // associations can be defined here
    site_page.hasMany(models.pvp_topic, {
      foreignKey: 'site_page_id',
      as: 'pvp_topics',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

  };
  return site_page;
};