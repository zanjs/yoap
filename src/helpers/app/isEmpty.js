const isStringEmpty = string => string.replace(/\s/g, '') === '';
const isObjectEmpty = obj => {
  if (obj.length === 0)  return true;
  if (obj.length > 0) {
    let isEmpty = true;

    obj.forEach(item => {
      if (isEmpty === true && item != null) {
        isEmpty = false;
      }
    })

    return isEmpty;
  }


  return Object.keys(obj).length === 0;
};

const isEmpty = value => {
  if (value == null || value == false) {
    return true;
  }

  switch(typeof value) {
    case 'string':
      return isStringEmpty(value);
    case 'object':
      return isObjectEmpty(value);
    case 'number':
      return value <= 0;
    default:
      return value;
  }
};

export default isEmpty;
