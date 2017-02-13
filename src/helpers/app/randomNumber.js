export default function randomNumber(min, max) {
  if (min != null && max != null) {
    return Math.random() * (max - min) + min;
  }

  return Math.random();
}
