
export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comments', {
    requestId: {
      type: DataTypes.INTEGER,
      required: true
    },
    comment: {
      type: DataTypes.TEXT,
      required: true
    },
    userId: {
      type: DataTypes.STRING,
      required: true
    },
  }, {});
  Comment.associate = (models) => {
    // associations can be defined here
    Comment.belongsTo(models.Requests, {
      foreignKey: 'requestId',
      targetKey: 'id'
    });
    Comment.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return Comment;
};
