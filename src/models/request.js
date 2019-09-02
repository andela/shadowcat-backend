export default (sequelize, DataTypes) => {
  const Requests = sequelize.define(
    'Requests',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        required: true
      },
      userId: {
        type: DataTypes.INTEGER,
        required: true
      },
      departureDate: {
        type: DataTypes.DATE,
        required: true
      },
      tripType: {
        type: DataTypes.STRING,
        required: true
      },
      travelReasons: {
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
      destinations: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    {}
  );
  Requests.associate = models => {
    Requests.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };

  return Requests;
};
