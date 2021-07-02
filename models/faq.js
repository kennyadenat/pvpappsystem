'use strict';
module.exports = (sequelize, DataTypes) => {
  const faq = sequelize.define('faq', {
    site: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'contact',
    },
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    ref: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
  }, {
    underscored: true,
  });
  faq.associate = function (models) {
    // associations can be defined here
  };
  return faq;
};