export default function getOrderId(id) {
  let start = 0;

  return () => id + (start++);
}
