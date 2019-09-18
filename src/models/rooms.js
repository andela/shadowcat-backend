export default (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    accommodationId: {
      type: DataTypes.INTEGER,
      required: true
    },
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    cost: {
      type: DataTypes.FLOAT,
      required: true,
    },
    status: {
      type: DataTypes.STRING,
      required: true,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    }
  }, {});
  Rooms.associate = (models) => {
    Rooms.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId',
      targetKey: 'id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Rooms;
};
