export default {
  up: (queryInterface, Sequelize) => Promise.all([queryInterface.addColumn('Users', 'role', {
    type: Sequelize.INTEGER,
    defaultValue: 1
  })]),
  down: (queryInterface) => Promise.all([queryInterface.removeColumn('Users', 'role')])
};
