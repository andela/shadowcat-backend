export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define(
    'Accommodation',
    {
      accommodationName: {
        type: DataTypes.STRING,
        required: true
      },
      accommodationAddress: {
        type: DataTypes.TEXT,
        required: true
      }
    },
    {}
  );
  Accommodation.associate = () => {};
  return Accommodation;
};
