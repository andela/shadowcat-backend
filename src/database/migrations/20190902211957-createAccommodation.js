export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Locations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    accommodationName: {
      type: Sequelize.STRING,
      required: true
    },
    accommodationAddress: {
      type: Sequelize.TEXT,
      required: true
    },
    createdAt: {
      type: Sequelize.DATE,
      required: true
    },
    updatedAt: {
      type: Sequelize.DATE,
      required: true
    }
  }),
  down: queryInterface => queryInterface.dropTable('Locations')
};
