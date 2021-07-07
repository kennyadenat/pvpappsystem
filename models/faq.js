'use strict';
module.exports = (sequelize, DataTypes) => {
  const faq = sequelize.define('faq', {
    faq_site_id: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'faq_sites',
        key: 'id',
        as: 'faq_site_id'
      }
    },
    tag: DataTypes.STRING,
    question: DataTypes.STRING,
    answer: DataTypes.TEXT,
    ref: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
  }, {
    underscored: true,
  });
  faq.associate = function (models) {
    // associations can be defined here
    faq.belongsTo(models.faq_site, {
      foreignKey: 'faq_site_id',
      as: 'faq_sites',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return faq;
};