const globals = typeof window === 'undefined' ? global : window;

export const debounce = (fn) => {
  let timerId = null;

  return (...args) => {
    if (timerId) {
      globals.cancelAnimationFrame(timerId);
    }

    timerId = globals.requestAnimationFrame(() => {
      fn(...args);
      timerId = null;
    });
  };
};
