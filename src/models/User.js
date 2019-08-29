module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  User.associate = () => {
    // associations can be defined here
  };
  return User;
};
