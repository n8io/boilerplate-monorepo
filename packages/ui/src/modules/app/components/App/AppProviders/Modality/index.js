import { debounce } from '@puttingpoker/common';
import { useEffect } from 'react';

const MODALITY_KEYBOARD = 'keyboard';
const MODALITY_MOUSE = 'mouse';
const TAB_KEY_CODE = 9;

export const Modality = () => {
  useEffect(() => {
    const onTabDown = debounce(50, e => {
      if (e.keyCode !== TAB_KEY_CODE) return;

      document.body.setAttribute('modality', MODALITY_KEYBOARD);
    });

    const onMouseDown = debounce(500, () =>
      document.body.setAttribute('modality', MODALITY_MOUSE)
    );

    window.addEventListener('keydown', onTabDown);
    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('keydown', onTabDown);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return null;
};
