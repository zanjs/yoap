export default (object, cb) => {
  let out;
  for (let prop in object) {
    out = cb(object[prop], prop, out, object)
  }

  return out;
}
