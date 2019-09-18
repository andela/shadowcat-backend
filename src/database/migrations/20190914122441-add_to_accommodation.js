export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Accommodation', 'accommodationName', 'name');
    await queryInterface.renameColumn('Accommodation', 'accommodationAddress', 'address');
    await queryInterface.addColumn('Accommodation', 'description', {
      type: Sequelize.TEXT
    });
    await queryInterface.addColumn('Accommodation', 'state', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Accommodation', 'country', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('Accommodation', 'services', {
      type: Sequelize.ARRAY(Sequelize.STRING)
    });
    await queryInterface.addColumn('Accommodation', 'amenities', {
      type: Sequelize.ARRAY(Sequelize.STRING)
    });
    await queryInterface.addColumn('Accommodation', 'images', {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Accommodation', 'description');
    await queryInterface.removeColumn('Accommodation', 'services');
    await queryInterface.removeColumn('Accommodation', 'amenities');
    await queryInterface.removeColumn('Accommodation', 'images');
    await queryInterface.removeColumn('Accommodation', 'state');
    await queryInterface.removeColumn('Accommodation', 'country');
    await queryInterface.renameColumn('Accommodation', 'name', 'accommodationName');
    await queryInterface.renameColumn('Accommodation', 'address', 'accommodationAddress');
  }
};
