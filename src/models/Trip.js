export default (sequelize, DataTypes) => {
    const Trips = sequelize.define('Trips', {
        tripId: {
            type: DataTypes.STRING,
            required: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            required: true
        },
        departureDate: {
            type: DataTypes.STRING,
            required: true
        },
        returnDate: {
            type: DataTypes.STRING,
            required: true
        },
        tripType: {
            type: DataTypes.STRING,
            required: true
        },
        reason: {
            type: DataTypes.TEXT,
            required: true
        },
        currentOfficeLocation: {
            type: DataTypes.STRING,
            required: true
        },
        accomodation: {
            type: DataTypes.TEXT,
            required: true
        },
        requestStatus: {
            type: DataTypes.STRING,
            required: true
        },
        destination: {
            type: DataTypes.STRING,
        },
    }, {});
    Trips.associate = (models) => {
        // associations can be defined here
        Trips.belongsTo(models.Users, {
            foreignKey: 'userId'
        });
    };

    return Trips;
};