import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';

export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        userId: uuidv4(),
        firstname: 'Chima',
        lastname: 'Ekeneme',
        email: 'chima_ekeneme@andela.com',
        password: bcrypt.hashSync('Qwertyuiop1!', 10),
        gmail: 'sebastinechima@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: uuidv4(),
        firstname: 'Chima',
        lastname: 'Ekeneme',
        email: 'chima.ekeneme@andela.com',
        password: bcrypt.hashSync('Qwertyuiop1!', 10),
        facebook: 'sebastinocj@yahoo.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};