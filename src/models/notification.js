
export default (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    tripId: {
      type: DataTypes.STRING,
      required: true
    },
    managerId: {
      type: DataTypes.STRING,
      required: true
    },
    userId: {
      type: DataTypes.STRING,
      required: true
    },
    isViewed: {
      type: DataTypes.BOOLEAN,
      required: true
    },
    content: {
      type: DataTypes.STRING,
      required: true
    }
  }, {});
  Notifications.associate = (models) => {
    // associations can be defined here
    Notifications.belongsTo(models.Trips, {
      foreignKey: 'tripId'
    });
  };

  return Notifications;
};
