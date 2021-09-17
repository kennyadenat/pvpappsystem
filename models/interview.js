'use strict';
module.exports = (sequelize, DataTypes) => {
  const interview = sequelize.define('interview', {
    header: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    speaker: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    topic: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    read_count: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    video_url: DataTypes.STRING,
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('draft', 'published', 'trash'),
      defaultValue: 'draft',
    },
    interviewdate: DataTypes.DATE,
  }, {
    underscored: true,
  });
  interview.associate = function (models) {
    // associations can be defined here
  };
  return interview;
};