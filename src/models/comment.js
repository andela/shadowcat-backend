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

    Comment.associate = (models) => {
        const { Requests, Users, } = models;

        Comment.belongsTo(Requests, {
            foreignKey: 'tripId',
            onDelete: 'CASCADE',
        });

        Comment.belongsTo(Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            as: 'author'
        });
    };

    return Comment;
};
