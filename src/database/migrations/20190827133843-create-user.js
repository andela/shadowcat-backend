export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Users',
      'userId',
      {
        type: Sequelize.UUID,
        allowNull: false
      }
    );
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Users', 'active', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
    await queryInterface.addColumn('Users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Users', 'userId');
    await queryInterface.removeColumn('Users', 'phone');
    await queryInterface.removeColumn('Users', 'active');
    await queryInterface.removeColumn('Users', 'isAdmin');
  }
};
