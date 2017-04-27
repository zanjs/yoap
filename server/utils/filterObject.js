export default obj => {
  let newObj = {};

  for (let prop in obj) {
    const value = obj[prop];
    if (value == null) {
      continue;
    }

    newObj[prop] = value;
  }

  return newObj
};
