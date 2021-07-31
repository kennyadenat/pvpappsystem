'use strict';
module.exports = (sequelize, DataTypes) => {
  const fee_category = sequelize.define('fee_category', {
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  fee_category.associate = function (models) {
    // associations can be defined here
    fee_category.hasMany(models.fee_subcategory, {
      foreignKey: 'fee_category_id',
      as: 'fee_subcategories',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return fee_category;
};