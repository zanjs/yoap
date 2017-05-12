const INTERVAL_TIMING = 100;

export default function subscribe(cb, check, interval, time) {
  let isLaunched = false;
  clearInterval(interval);
  const fn = () => {
    if (isLaunched)
      return;

    if (isLaunched = check()) {
      clearInterval(interval);
      return cb()
    }
  };

  interval = setInterval(fn, time || INTERVAL_TIMING);
  return fn();
}
