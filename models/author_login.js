'use strict';
module.exports = (sequelize, DataTypes) => {
  const author_login = sequelize.define('author_login', {
    authors_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_agent: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscored: true,
  });
  author_login.associate = (models) => {
    // associations can be defined here
    author_login.belongsTo(models.authors, {
      foreignKey: 'authors_id',
      as: 'authors',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return author_login;
};