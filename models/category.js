'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    title: DataTypes.STRING,
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

    category.belongsTo(models.site_name, {
      foreignKey: 'site_name_id',
      as: 'site_names',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return category;
};