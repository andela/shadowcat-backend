
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'Chima',
        lastname:'Mark',
        email: 'chimamark@example.com',
        password:bcrypt.hashSync('Chibyke8%', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'frank',
        lastname:'chidinma',
        email: 'frankchidinma@example.com',
        password: bcrypt.hashSync('Chibyke8%', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};

// database/seeds/xxxx-User.js
