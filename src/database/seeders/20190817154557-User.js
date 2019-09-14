import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'Sylvanus',
        lastname: 'Elendu',
        email: 'chidimma.okafor@andela.com',
        password: bcrypt.hashSync('IamUser', 10),
        userId: uuidv4(),
        linemanager: 1,
        role: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: '7cd4d4af-72f4-438e-8109-dee9646c7286',
        firstname: 'frank',
        lastname: 'chidinma',
        email: 'stephenibaba@andela.com',
        password: bcrypt.hashSync('Jennylove19', 10),
        role: '1',
        linemanager: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
