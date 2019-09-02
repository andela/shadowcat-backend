export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Location',
    [
      {
        locationName: 'Rosey Jones Plaza',
        locationAddress: 'Abuja, Nigeria',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationName: 'Jim Roose',
        locationAddress: 'Ogoja, Cross River',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),
  down: queryInterface => queryInterface.bulkDelete('Location', null, {})
};
