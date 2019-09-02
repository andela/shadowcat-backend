export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Accommodation',
    [
      {
        accommodationName: 'Hotel',
        accommodationAddress: 'Abuja, Nigeria',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        accommodationName: 'Tiny Lawer',
        accommodationAddress: 'Ogoja, Cross River',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('Accommodation', null, {})
};
