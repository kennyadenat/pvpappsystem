'use strict';
module.exports = (sequelize, DataTypes) => {
  const interview = sequelize.define('interview', {
    duration: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    speaker: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    video_url: DataTypes.STRING,
    interviewdate: DataTypes.DATE
  }, {
    underscored: true,
  });
  interview.associate = function (models) {
    // associations can be defined here
  };
  return interview;
};