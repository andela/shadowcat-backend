export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Requests', 'accommodation', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('Requests', 'accommodation');
  }
};
