module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    phone: DataTypes.STRING
  }, {});
  User.associate = () => {
    // associations can be defined here
  };
  return User;
};
