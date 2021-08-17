'use strict';
module.exports = (sequelize, DataTypes) => {
  const impact = sequelize.define('impact', {
    header: DataTypes.STRING,
    title: DataTypes.STRING,
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.TEXT,
    body: DataTypes.TEXT,
    imp_type: {
      allowNull: false,
      type: DataTypes.ENUM('success', 'impact'),
      defaultValue: 'success',
    },
    story: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  }, {
    underscored: true,
  });
  impact.associate = function (models) {
    // associations can be defined here
  };
  return impact;
};