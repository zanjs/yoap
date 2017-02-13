const INTERVAL_TIMING = 100;

export default function subscribe(cb, check, interval, time) {
  clearInterval(interval);

  interval = setInterval(() => {
    if (check()) {
      clearInterval(interval);
      cb()
    }
  }, time || INTERVAL_TIMING);
}
