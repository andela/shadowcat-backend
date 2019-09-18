
export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Accommodation',
    [
      {
        locationId: 1,
        name: 'Epic Estate',
        address: '235 Ikorodu Rd, Ilupeju, Lagos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationId: 2,
        name: 'Peaston Estate',
        address: '12 Bay Str, Ogoja, Cross River',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('Accommodation', null, {})
};
