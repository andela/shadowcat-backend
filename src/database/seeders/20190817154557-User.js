import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'Sylvanus',
        lastname: 'Elendu',
        email: 'chidimma.okafor.c@gmail.com',
        password: bcrypt.hashSync('IamUser', 10),
        userId: uuidv4(),
        managerId: '377c8663-3cb1-451a-af2d-df8eca3ebc6c',
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: uuidv4(),
        firstname: 'frank',
        lastname: 'chidinma',
        email: 'stephenibaba@andela.com',
        password: bcrypt.hashSync('Jennylove19', 10),
        role: 'Manager',
        managerId: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
