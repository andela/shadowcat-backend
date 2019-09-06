module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        userId: {
            type: DataTypes.STRING,
            required: true
        },
        tripId: {
            type: DataTypes.STRING,
            required: true
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {});

    Comment.associate = () => {
        
      
    };

    return Comment;
};
