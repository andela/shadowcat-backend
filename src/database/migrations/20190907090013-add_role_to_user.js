export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'role');
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.INTEGER,
      defaultValue: 1
    });
  },
  down: (queryInterface) => Promise.all([queryInterface.removeColumn('Users', 'role')])
};
