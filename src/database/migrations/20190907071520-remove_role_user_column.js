export default {
  up: (queryInterface) => Promise.all([queryInterface.removeColumn('Users', 'role')]),
  down: (queryInterface, Sequelize) => Promise.all([queryInterface.addColumn('Users', 'role', { type: Sequelize.INTEGER })])
};
