// eslint-disable-next-line no-undef
const globals = window || global;

export const debounce = fn => {
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
