export default function getDecimal(num) {
  return num > 0 ? (num % 1) : (-num % 1);
}
