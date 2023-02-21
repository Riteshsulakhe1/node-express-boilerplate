const userRoles = {
  user: 'user',
  admin: 'admin'
};

const allRoles = {
  [userRoles.user]: [],
  [userRoles.admin]: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
  userRoles
};
