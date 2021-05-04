'use strict';
module.exports = (sequelize, DataTypes) => {
  const subcategory = sequelize.define('subcategory', {
    title: DataTypes.STRING,
    img_url: DataTypes.STRING,
    category_id: {
      type: DataTypes.UUID
    }
  }, {
    underscored: true,
  });
  subcategory.associate = (models) => {
    // associations can be defined here
    subcategory.belongsTo(models.category, {
      foreignKey: 'category_id',
      as: 'categories',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return subcategory;
};