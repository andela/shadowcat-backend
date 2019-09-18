
export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'roles',
    [
      {
        roleName: 'requester',
        rolePermissions: ['makeRequest'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: 'manager',
        rolePermissions: ['acceptRequest', 'rejectRequest', 'makeRequest'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: 'travel_team_member',
        rolePermissions: ['acceptRequest', 'rejectRequest', 'makeRequest'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: 'travel_administrator',
        rolePermissions: ['acceptRequest', 'rejectRequest', 'makeRequest'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleName: 'super_administrator',
        rolePermissions: ['acceptRequest', 'rejectRequest', 'updateRole', 'makeRequest', 'updatePermissions'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}
  ),

  down: queryInterface => queryInterface.bulkDelete('roles', null, {})
};
