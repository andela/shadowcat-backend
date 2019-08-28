
import bcrypt from 'bcryptjs';

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'Chima',
        lastname: 'Mark',
        email: 'chimamark@andela.com',
        password: bcrypt.hashSync('Chibyke8%', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'frank',
        lastname: 'chidinma',
        email: 'frankchidinma@andela.com',
        password: bcrypt.hashSync('Chibyke8%', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
