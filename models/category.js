'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    title: DataTypes.STRING,
    img_url: DataTypes.STRING
  }, {
    underscored: true,
  });
  category.associate = (models) => {

    category.hasMany(models.blog, {
      foreignKey: 'category_id',
      as: 'blogs',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return category;
};