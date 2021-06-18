'use strict';
module.exports = (sequelize, DataTypes) => {
  const pvp_subtopic = sequelize.define('pvp_subtopic', {
    pvp_topic_id: DataTypes.UUID,
    title: DataTypes.TEXT,
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    underscored: true,
  });
  pvp_subtopic.associate = (models) => {
    // associations can be defined here
    pvp_subtopic.belongsTo(models.pvp_topic, {
      foreignKey: 'pvp_topic_id',
      as: 'pvp_topics',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    pvp_subtopic.hasMany(models.article, {
      foreignKey: 'pvp_subtopic_id',
      as: 'articles',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return pvp_subtopic;
};