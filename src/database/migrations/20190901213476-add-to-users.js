export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'managerId', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Users', 'notifyMeEmail', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    });
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'User',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'managerId');
    await queryInterface.removeColumn('Users', 'notifyMeEmail');
    await queryInterface.removeColumn('Users', 'role');
  }
};
