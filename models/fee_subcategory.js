'use strict';
module.exports = (sequelize, DataTypes) => {
  const fee_subcategory = sequelize.define('fee_subcategory', {
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  fee_subcategory.associate = function (models) {
    // associations can be defined here
    fee_subcategory.belongsTo(models.fee_category, {
      foreignKey: 'fee_category_id',
      as: 'fee_categories',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    fee_subcategory.hasMany(models.fee, {
      foreignKey: 'fee_subcategory_id',
      as: 'fees',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return fee_subcategory;
};