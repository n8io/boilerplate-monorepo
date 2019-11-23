import { Utils } from '@boilerplate-monorepo/common';
import { useState, useEffect, useCallback } from 'react';

export const useLongPress = (callback = Utils.noop, milliseconds = 600) => {
  const [isLongPressing, beLongPressing] = useState(false);

  const startLongPressing = useCallback(() => beLongPressing(true));
  const endLongPressing = useCallback(() => beLongPressing(false));

  useEffect(() => {
    let timerId = null;

    if (isLongPressing) {
      timerId = setTimeout(callback, milliseconds);
    } else {
      clearTimeout(timerId);
    }

    return () => clearTimeout(timerId);
  }, [isLongPressing]);

  return {
    isLongPressing,
    onMouseDown: startLongPressing,
    onMouseLeave: endLongPressing,
    onMouseUp: endLongPressing,
    onTouchEnd: endLongPressing,
    onTouchStart: startLongPressing,
  };
};
