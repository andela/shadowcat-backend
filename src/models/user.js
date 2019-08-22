module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    phone: DataTypes.STRING
  }, {});
  User.associate = () => {
    // associations can be defined here
  };
  return User;
};
