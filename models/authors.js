'use strict';
module.exports = (sequelize, DataTypes) => {
  const authors = sequelize.define('authors', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_login: DataTypes.DATE,
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_notify: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
  }, {
    underscored: true,
  });

  authors.associate = (models) => {
    // associations can be defined here
    authors.hasMany(models.blog, {
      foreignKey: 'authors_id',
      as: 'blogs',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    authors.hasMany(models.article, {
      foreignKey: 'authors_id',
      as: 'articles',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return authors;
};