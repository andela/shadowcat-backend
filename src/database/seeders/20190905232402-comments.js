import uuidv4 from 'uuid/v4';
module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Comments',
    [
      {
        userId: uuidv4(),
        tripId: '0000',
        body: '1233454 Ikorodu road, Lagos, Nigeria',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: uuidv4(),
        tripId: '1010',
        body: '1233454 Ikorodu road, Lagos, Nigeria',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: uuidv4(),
        tripId: '2020',
        body: '1233454 Ikorodu road, Lagos, Nigeria',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Comments', null, {})
};
