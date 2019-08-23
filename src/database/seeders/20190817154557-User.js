
import bcrypt from 'bcryptjs';

export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'Sylvanus',
        lastname: 'Elendu',
        email: 'sylvanus.elendu@andela.com',
        password: bcrypt.hashSync('IamUser', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'frank',
        lastname: 'chidinma',
        email: 'okaforchidimma.c@gmail.com',
        password: bcrypt.hashSync('Jennylove19', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},

  ),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
