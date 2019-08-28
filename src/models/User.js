
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Users.associate = () => {
    // associations can be defined here
  };
  return Users;
};
