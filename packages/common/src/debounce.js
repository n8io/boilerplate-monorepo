export const debounce = (delay, fn) => {
  let timerId = null;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};
