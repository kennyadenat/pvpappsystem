'use strict';
module.exports = (sequelize, DataTypes) => {
  const attendee = sequelize.define('attendee', {
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    organization: DataTypes.STRING,
    s_id: DataTypes.STRING,
    state: DataTypes.STRING,
    event_id: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'events',
        key: 'id',
        as: 'event_id'
      }
    }
  }, {
    underscored: true,
  });
  attendee.associate = function (models) {
    // associations can be defined here
    attendee.belongsTo(models.events, {
      foreignKey: 'event_id',
      as: 'events',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return attendee;
};