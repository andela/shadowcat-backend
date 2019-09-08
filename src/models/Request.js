
export default (sequelize, DataTypes) => {
  const Requests = sequelize.define('Requests', {
    tripId: {
      type: DataTypes.STRING,
      required: true
    },
    userId: {
      type: DataTypes.STRING,
      required: true
    },
    departureDate: {
      type: DataTypes.DATE,
      required: true
    },
    returnDate: {
      type: DataTypes.DATE,
      required: true
    },
    tripType: {
      type: DataTypes.STRING,
      required: true
    },
    reason: {
      type: DataTypes.TEXT,
      required: true
    },
    accomodation: {
      type: DataTypes.TEXT,
      required: true
    },
    currentOfficeLocation: {
      type: DataTypes.INTEGER,
      required: true
    },
    requestStatus: {
      type: DataTypes.STRING,
      required: true
    },
    destination: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  Requests.associate = (models) => {
    // associations can be defined here
    Requests.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };

  return Requests;
};
