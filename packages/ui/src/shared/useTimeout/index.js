import { noop } from '@puttingpoker/common';
import { useEffect, useRef } from 'react';

export const useTimeout = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (delay) {
      const id = setTimeout(tick, delay);

      return () => clearTimeout(id);
    }

    return noop;
  }, [delay]);
};
