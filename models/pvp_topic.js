'use strict';
module.exports = (sequelize, DataTypes) => {
  const pvp_topic = sequelize.define('pvp_topic', {
    title: DataTypes.STRING,
    thumbnail: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    overview: DataTypes.TEXT
  }, {
    underscored: true,
  });
  pvp_topic.associate = (models) => {
    // associations can be defined here
    pvp_topic.hasMany(models.pvp_subtopic, {
      foreignKey: 'pvp_topic_id',
      as: 'pvp_subtopics',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return pvp_topic;
};