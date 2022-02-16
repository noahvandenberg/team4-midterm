const { allMaps, findMapsByUser, findMapsById, updateMapTitle, updateMapDescription, createMap, deleteMap } = require('../db/queries/map-queries')
const { allPoints, findPointsByUser, findPointsById, updatePointTitle, updatePointDescription, updatePointImageURL, updatePointLocation, createPoint, deletePoint} = require('../db/queries/point-queries')
const { allUsers, findUserById, updateUserEmail, updateUserFirstName, updateUserLastName, updateUserPassword, createUser, deleteUser} = require('../db/queries/user-queries')

const authenticateUser = (userId, password) => {
  const user = findUserById(userId);
  // - Implement Bcrypt Later
  if (user.password === password) {
    return true
  }
  return false
}



module.exports = {
  authenticateUser,
}
