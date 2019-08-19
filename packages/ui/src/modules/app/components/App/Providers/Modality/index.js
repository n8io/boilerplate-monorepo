import { debounce } from '@puttingpoker/common';
import { useEffect } from 'react';
import { css } from 'styled-components/macro';
import { Color } from 'types/color';

const MODALITY_KEYBOARD = 'keyboard';
const MODALITY_MOUSE = 'mouse';
const TAB_KEY_CODE = 9;

export const styles = css`
  body[modality="${MODALITY_MOUSE}"] *:focus {
    outline: none !important;
  }

  /* stylelint-disable-next-line no-duplicate-selectors */
  body[modality="${MODALITY_KEYBOARD}"] *:focus {
    outline: 0.375rem solid ${Color.focusRing} !important; /* for non-webkit browsers */
    outline: 0.375rem auto -webkit-focus-ring-color !important;
  }
`;

export const Modality = () => {
  useEffect(() => {
    const onTabDown = debounce(e => {
      if (e.keyCode !== TAB_KEY_CODE) return;

      document.body.setAttribute('modality', MODALITY_KEYBOARD);
    });

    const onMouseDown = debounce(() =>
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
