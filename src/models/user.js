module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      userId: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        required: true
      },
      managerId: {
        type: DataTypes.STRING,
        required: false
      },
      firstname: {
        type: DataTypes.STRING,
        required: true
      },
      lastname: {
        type: DataTypes.STRING,
        required: true
      },
      email: {
        type: DataTypes.STRING,
        required: true
      },
      role: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        required: false
      },
      phone: {
        type: DataTypes.STRING,
        required: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        required: false
      },
      active: {
        type: DataTypes.BOOLEAN,
        required: false
      },
      notifyMeEmail: {
        type: DataTypes.BOOLEAN,
        required: true
      },
      gmail: {
        type: DataTypes.STRING,
        required: false
      },
      facebook: {
        type: DataTypes.STRING,
        required: false
      }
    },
    {}
  );
  Users.associate = models => {
    Users.hasMany(models.Trips, {
      as: 'userdetail', foreignKey: 'userId', onUpdate: 'CASCADE', onDelete: 'CASCADE'
    });
  };

  return Users;
};
