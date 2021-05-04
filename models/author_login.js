'use strict';
module.exports = (sequelize, DataTypes) => {
  const author_login = sequelize.define('author_login', {
    authors_id: DataTypes.STRING,
    ip_address: DataTypes.STRING,
    user_agent: DataTypes.STRING
  }, {
    underscored: true,
  });
  author_login.associate = function(models) {
    // associations can be defined here
  };
  return author_login;
};