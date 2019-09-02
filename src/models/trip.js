export default (sequelize, DataTypes) => {
  const Trips = sequelize.define('Trips', {
    tripId: {
      type: DataTypes.STRING,
      required: true
    },
    userId: {
      type: DataTypes.STRING,
      required: true
    },
    managerId: {
      type: DataTypes.STRING,
      required: true
    },
    departureDate: {
      type: DataTypes.STRING,
      required: true
    },
    returnDate: {
      type: DataTypes.STRING,
      required: true
    },
    type: {
      type: DataTypes.STRING,
      required: true
    },
    reason: {
      type: DataTypes.TEXT,
      required: true
    },
    currentOfficeLocation: {
      type: DataTypes.STRING,
      required: true
    },
    destinations: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  Trips.associate = (models) => {
    // associations can be defined here
    Trips.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
    Trips.hasMany(models.Notifications, {
      as: 'notifydetails', foreignKey: 'tripId', onUpdate: 'CASCADE', onDelete: 'CASCADE'
    });
  };

  return Trips;
};
