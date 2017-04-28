export default data => {
  let newData = {};

  for (let prop in data) {
    if (
      prop !== 'verified' && prop !== 'editedAt'
      && prop !== 'createdAt' && prop !== 'isAdmin'
      && prop !== 'banned' && prop !== 'password_digest'
      //&& prop !== 'objects' && prop !== 'featured'
      && prop !== 'lastVisit' && prop !== 'visits' && prop !== 'isDeleted'
      && prop !== 'isDummy' && prop !== 'token' && prop !== 'verifyToken'
    ) {
      newData[prop] = data[prop];
    }
  }

  return newData;
}
