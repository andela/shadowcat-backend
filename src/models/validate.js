
module.exports = (sequelize, DataTypes) => {
  const Validate = sequelize.define('Validate', {
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  Validate.associate = (models) => {
    Validate.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Validate;
};
