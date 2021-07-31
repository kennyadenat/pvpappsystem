'use strict';
module.exports = (sequelize, DataTypes) => {
  const fee = sequelize.define('fee', {
    description: {
      type: DataTypes.TEXT,
    },
    fee_subcategory_id: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'fee_subcategories',
        key: 'id',
        as: 'fee_subcategory_id'
      }
    },
    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'NGN'
    },
    additional: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    charges: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  }, {
    underscored: true,
  });
  fee.associate = function (models) {
    // associations can be defined here
    fee.belongsTo(models.fee_subcategory, {
      foreignKey: 'fee_subcategory_id',
      as: 'fee_subcategories',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return fee;
};