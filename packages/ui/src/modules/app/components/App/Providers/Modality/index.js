import { debounce } from '@puttingpoker/common';
import { useEffect } from 'react';
import { css } from 'styled-components/macro';

const MODALITY_ATTRIBUTE = 'modality';
const MODALITY_KEYBOARD = 'keyboard';
const MODALITY_MOUSE = 'mouse';
const TAB_KEY_CODE = 9;

export const styles = css`
  body[modality='${MODALITY_MOUSE}'] *:focus {
    outline: none !important;
  }

  /* stylelint-disable-next-line no-duplicate-selectors */
  body[modality='${MODALITY_KEYBOARD}'] *:focus {
    outline: calc(var(--layout-base-unit) * 0.375) auto -webkit-focus-ring-color !important;
  }
`;

export const Modality = () => {
  useEffect(() => {
    const onKeyDown = debounce(e => {
      if (e.keyCode !== TAB_KEY_CODE) return;

      document.body.setAttribute(MODALITY_ATTRIBUTE, MODALITY_KEYBOARD);
    });

    const onMouseDown = debounce(() =>
      document.body.setAttribute(MODALITY_ATTRIBUTE, MODALITY_MOUSE)
    );

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return null;
};
