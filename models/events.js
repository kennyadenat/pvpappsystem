'use strict';
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('closed', 'started', 'loading', 'suspended'),
      defaultValue: 'loading'
    },
    type: DataTypes.STRING,
    header: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    share_url: {
      type: DataTypes.STRING
    },
    venue: DataTypes.STRING,
    address: DataTypes.STRING,
    duration: {
      type: DataTypes.INTEGER
    }
  }, {
    underscored: true,
  });
  events.associate = function (models) {
    // associations can be defined here
  };
  return events;
};