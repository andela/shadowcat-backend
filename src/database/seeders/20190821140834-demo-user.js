
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'demo@demo.com',
        password: 'MTHAMAYORISARA',
        phone: '08067672345',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
