/**
* Object keys map.
*
* @param {Object} object
* @param {Function} cb
*
* @return {*}
*/
export default (object, cb) => {
  let result;
  for (let prop in object) {
    result = cb(object[prop], prop, result, object)
  }

  return result;
}
