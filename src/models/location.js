
export default (sequelize, DataTypes) => {
  const Locations = sequelize.define('Locations', {
    locationName: {
      type: DataTypes.STRING,
      required: true
    },
    locationAddress: {
      type: DataTypes.TEXT,
      required: true
    }
  }, {});
  Locations.associate = () => {

  };
  return Locations;
};
