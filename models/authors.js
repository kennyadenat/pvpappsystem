'use strict';
module.exports = (sequelize, DataTypes) => {
  const authors = sequelize.define('authors', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true
    },
    fullname: {
      type: DataTypes.STRING,
      unique: true,
      required: true
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM('admin', 'super_admin'),
      defaultValue: 'admin',
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'http://res.cloudinary.com/dgniwrwip/image/upload/v1584245342/tqrfdrdjbtwrhokpbb1r.jpg'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE
    },
    token: {
      type: DataTypes.STRING
    },
    email_notify: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
    approved: {
      defaultValue: false,
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

    authors.hasMany(models.author_login, {
      foreignKey: 'authors_id',
      as: 'author_logins',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return authors;
};