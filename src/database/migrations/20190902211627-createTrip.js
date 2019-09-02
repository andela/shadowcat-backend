export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Request', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    currentOfficeLocation: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    destination: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    tripType: {
      type: Sequelize.STRING,
      allowNull: false
    },
    departureDate: {
      ttype: Sequelize.DATE,
      allowNull: false
    },
    travelReasons: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    accommodation: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    requestStatus: {
      type: Sequelize.STRING,
      required: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
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

  down: queryInterface => queryInterface.dropTable('Request')
};
