const { allMaps, findMapsByUser, findMapById, updateMapTitle, updateMapDescription, updateMapImageUrl, createMap, deleteMap } = require('../db/queries/map-queries');
const { allPoints, findPointsByUser, findPointById, updatePointTitle, updatePointDescription, updatePointImageURL, updatePointLocation, createPoint, deletePoint} = require('../db/queries/point-queries');
const { allUsers, findUserById, updateUserEmail, updateUserName, updateUserPassword, updateUserImageURL, createUser, deleteUser} = require('../db/queries/user-queries');

const authenticateUser = (userId, password) => {
  const user = findUserById(userId);
  // - Implement Bcrypt Later
  if (user.password === password) {
    return true;
  }
  return false;
};

const isLoggedIn = (cookie) => {
  if (cookie === true) {
    return true;
  }
  return false;
};

const randomSelection = (arr, count) => {
  const randomArr = [];
  for (let i = 0; i < count; i++) {
    const randomChoice = Math.floor(Math.random() * arr.length);
    randomArr.push(arr[randomChoice]);
  }
  return randomArr;
};


module.exports = {
  authenticateUser,
  isLoggedIn,
  randomSelection,
};
