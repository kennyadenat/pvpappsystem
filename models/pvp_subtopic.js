'use strict';
module.exports = (sequelize, DataTypes) => {
  const pvp_subtopic = sequelize.define('pvp_subtopic', {
    pvp_topic_id: DataTypes.STRING,
    title: DataTypes.STRING,
    thumbnail: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    body: DataTypes.TEXT
  }, {
    underscored: true,
  });
  pvp_subtopic.associate = (models) => {
    // associations can be defined here
    pvp_subtopic.belongsTo(models.pvp_topic, {
      foreignKey: 'pvp_topic_id',
      as: 'pvp_topic',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return pvp_subtopic;
};