
export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Users', 'userId', {
      type: Sequelize.STRING
    }),
    queryInterface.addConstraint('Users', ['userId'], {
      type: 'primary key',
      name: 'user_id_primary_key_constraint'
    }),
    queryInterface.addConstraint('Users', ['userId'], {
      type: 'unique',
      name: 'unique_id_constraint'
    }),
    queryInterface.addColumn('Users', 'facebook', {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn('Users', 'gmail', {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn('Users', 'gender', {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn('Users', 'birthday', {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn('Users', 'preferredlanguage', {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn('Users', 'currency', {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn('Users', 'residentialaddress', {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn('Users', 'department', {
      type: Sequelize.STRING
    }),
    queryInterface.addColumn('Users', 'linemanager', {
      type: Sequelize.STRING
    }),
  ]),

  down: queryInterface => Promise.all([
    queryInterface.removeColumn('Users', 'userId'),
    queryInterface.removeColumn('Users', 'facebook'),
    queryInterface.removeColumn('Users', 'gender'),
    queryInterface.removeColumn('Users', 'birthday'),
    queryInterface.removeColumn('Users', 'preferredlanguage'),
    queryInterface.removeColumn('Users', 'currency'),
    queryInterface.removeColumn('Users', 'residentialaddress'),
    queryInterface.removeColumn('Users', 'role'),
    queryInterface.removeColumn('Users', 'department'),
    queryInterface.removeColumn('Users', 'linemanager'),
  ])
};
