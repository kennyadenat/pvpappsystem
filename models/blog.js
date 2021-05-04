'use strict';
module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('blog', {
    title: DataTypes.STRING,
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    body: DataTypes.TEXT,
    authors_id: {
      type: DataTypes.UUID
    },
    header: {
      type: DataTypes.STRING,
      defaultValue: ''
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

  blog.associate = (models) => {
    // associations can be defined here
    blog.belongsTo(models.authors, {
      foreignKey: 'authors_id',
      as: 'authors',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return blog;
};