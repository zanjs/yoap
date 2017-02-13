const emptyString = (string) => string.replace(/\s/g, '') === '';
const emptyObject = (obj) => {
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  let i = 0;

  for (let key in obj) {
    i++
  }

  return i === 0;
};

const isEmpty = (value) => {
  if (value == null) {
    return true;
  }

  switch(typeof value) {
    case 'string':
      return emptyString(value);
    case 'object':
      return emptyObject(value);
    default:
      return value;
  }
};

export default isEmpty;
