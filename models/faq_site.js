'use strict';
module.exports = (sequelize, DataTypes) => {
  // this is for faqs
  const faq_site = sequelize.define('faq_site', {
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  faq_site.associate = function (models) {
    // associations can be defined here

    faq_site.hasMany(models.faq, {
      foreignKey: 'faq_site_id',
      as: 'faqs',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return faq_site;
};