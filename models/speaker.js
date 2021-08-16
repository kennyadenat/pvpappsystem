'use strict';
module.exports = (sequelize, DataTypes) => {
  const speaker = sequelize.define('speaker', {
    event_id: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'events',
        key: 'id',
        as: 'event_id'
      }
    },
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    avatar: DataTypes.STRING,
    bio: DataTypes.STRING,
    social: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    role: DataTypes.STRING,
    expertise: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    }
  }, {
    underscored: true,
  });
  speaker.associate = function (models) {
    // associations can be defined here
  };
  return speaker;
};