module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userId: {
      type: DataTypes.STRING,
      required: true
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
    password: {
      type: DataTypes.STRING,
      required: false
    },
    gmail: {
      type: DataTypes.STRING,
      required: false
    },
    facebook: {
      type: DataTypes.STRING,
      required: false
    }
  }, {});
  Users.associate = () => {
    // associations can be defined here
    Users.associate = (models) => Users.hasMany(models.ReturnTrip, { foreignKey: 'user_id', onUpdate: 'CASCADE' });
  };
  return Users;
};
