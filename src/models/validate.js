
module.exports = (sequelize, DataTypes) => {
  const Validate = sequelize.define('Validate', {
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  Validate.associate = (models) => {
    Validate.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };
  return Validate;
};
