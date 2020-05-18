import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (delay) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }

    return () => null;
  }, [delay]);
};
