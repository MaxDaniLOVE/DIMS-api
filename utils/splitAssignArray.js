const splitAssignArray = (alreadyAssigned, usersToAssign) => {
  const unassignedUsers = usersToAssign.filter((el) => !alreadyAssigned.includes(el));
  const usersToUnassign = alreadyAssigned.filter((el) => !usersToAssign.includes(el));
  return { unassignedUsers, usersToUnassign };
};

module.exports = splitAssignArray;