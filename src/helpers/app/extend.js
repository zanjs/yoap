export default function extend(first, last) {
  Object.assign(first, last);

  return first;
}
