import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        userId: uuidv4(),
        firstname: 'Chima',
        lastname: 'Mark',
        email: 'chimamark@andela.com',
        password: bcrypt.hashSync('Chibyke8%', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: uuidv4(),
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
