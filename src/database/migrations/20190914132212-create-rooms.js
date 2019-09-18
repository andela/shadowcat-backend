
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Rooms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    accommodationId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Accommodation',
        key: 'id'
      }
    },
    name: {
      type: Sequelize.STRING
    },
    cost: {
      type: Sequelize.FLOAT
    },
    status: {
      type: Sequelize.STRING
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
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
  down: (queryInterface) => queryInterface.dropTable('Rooms')
};
