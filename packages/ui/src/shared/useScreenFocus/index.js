import { Utils } from '@boilerplate-monorepo/common';
import { useEffect, useState } from 'react';

const useScreenFocus = (callback = Utils.noop) => {
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setHasFocus(document.hasFocus()), 500);

    return () => clearInterval(interval);
  }, [callback, setHasFocus]);

  useEffect(() => {
    callback(hasFocus);
  }, [callback, hasFocus]);

  return hasFocus;
};

export { useScreenFocus };
