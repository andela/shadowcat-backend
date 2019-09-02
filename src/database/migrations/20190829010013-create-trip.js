
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Trips', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    tripId: {
      type: Sequelize.STRING,
      unique: true
    },
    userId: {
      type: Sequelize.STRING,
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
    departureDate: {
      type: Sequelize.STRING,
    },
    returnDate: {
      type: Sequelize.STRING,
    },
    tripType: {
      type: Sequelize.STRING,
    },
    reason: {
      type: Sequelize.TEXT,
    },
    currentOfficeLocation: {
      type: Sequelize.STRING,
    },
    destinations: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
    },
    requestStatus: {
      type: Sequelize.STRING,
      required: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Trips')
};
