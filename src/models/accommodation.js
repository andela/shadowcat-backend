export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    locationId: {
      type: DataTypes.INTEGER,
      required: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      references: {
        model: 'Locations',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      unique: true
    },
    address: {
      type: DataTypes.TEXT,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      required: true,
    },
    services: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      required: true,
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      required: true,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      required: true,
    }
  }, {});
  Accommodation.associate = (models) => {
    // associations can be defined here
    Accommodation.belongsTo(models.Locations, {
      foreignKey: 'locationId',
      targetKey: 'id'
    });
    Accommodation.hasMany(models.Rooms, { foreignKey: 'accomodationId', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
  };
  return Accommodation;
};
