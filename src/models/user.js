module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      userId: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
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
  Users.associate = () => {
    // associations can be defined here
  };
  return Users;
};
