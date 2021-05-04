'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    title: DataTypes.STRING,
    img_url: DataTypes.STRING
  }, {
    underscored: true,
  });
  category.associate = (models) => {
    // associations can be defined here
    category.hasMany(models.subcategory, {
      foreignKey: 'category_id',
      as: 'subcategories',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return category;
};