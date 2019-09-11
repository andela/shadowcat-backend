module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tripId: {
      type: Sequelize.STRING,
      references: {
        model: 'Requests',
        key: 'tripId'
      }
    },
    comment: {
      type: Sequelize.TEXT
    },
    userId: {
      type: Sequelize.STRING,
      references: {
        model: 'Users',
        key: 'userId'
      }
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
  down: (queryInterface) => queryInterface.dropTable('Comments')
};
