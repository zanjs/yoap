export default (arr, cb) => {
  let out;
  for (let i = 0, l = arr.length; i < l; i++) {
    out = cb(arr[i], i, out, l, arr);
  }

  return out;
};
