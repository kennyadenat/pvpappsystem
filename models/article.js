'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    article_category_id: DataTypes.STRING,
    article_subcategory_id: DataTypes.STRING,
    body: DataTypes.TEXT,
    header: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    authors_id: DataTypes.STRING,
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
    up_vote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    down_vote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    thumbnail: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: '',
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
  };
  return article;
};