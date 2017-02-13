const emptyString = string => string.replace(/\s/g, '') === '';
const emptyObject = obj => {
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  return !Object.keys(obj).length;
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
