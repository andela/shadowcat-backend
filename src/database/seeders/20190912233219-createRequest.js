
module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Requests',
    [
      {
        tripId: '0404e4b2-15d4-4b82-bec4-bb21a83ce6a2',
        userId: '7cd4d4af-72f4-438e-8109-dee9646c7286',
        requestStatus: 'pending',
        departureDate: '2019-11-01',
        returnDate: '2019-12-10',
        currentOfficeLocation: '1',
        reason: 'official',
        tripType: 'Multi-city',
        destination: [2, 3],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Locations', null, {})
};
