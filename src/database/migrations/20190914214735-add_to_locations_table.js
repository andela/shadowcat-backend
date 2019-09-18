export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Locations', 'state', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Locations', 'country', {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Locations', 'state');
    await queryInterface.removeColumn('Locations', 'country');
  }
};
