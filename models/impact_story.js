'use strict';
module.exports = (sequelize, DataTypes) => {
  const impact_story = sequelize.define('impact_story', {
    impact_id: DataTypes.STRING,
    header: DataTypes.STRING,
    story: DataTypes.TEXT,
    url: DataTypes.STRING
  }, {
    underscored: true,
  });
  impact_story.associate = function(models) {
    // associations can be defined here
  };
  return impact_story;
};