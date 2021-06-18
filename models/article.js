'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    pvp_subtopic_id: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'pvp_subtopics',
        key: 'id',
        as: 'pvp_subtopic_id'
      }
    },
    body: DataTypes.TEXT,
    authors_id: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'authors',
        key: 'id',
        as: 'authors_id'
      }
    },
    read_time: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    read_count: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('draft', 'published', 'trash'),
      defaultValue: 'draft',
    },
    tagsList: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },

  }, {
    underscored: true,
  });
  article.associate = (models) => {
    // associations can be defined here
    article.belongsTo(models.authors, {
      foreignKey: 'authors_id',
      as: 'authors',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    article.belongsTo(models.pvp_subtopic, {
      foreignKey: 'pvp_subtopic_id',
      as: 'pvp_subtopics',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return article;
};