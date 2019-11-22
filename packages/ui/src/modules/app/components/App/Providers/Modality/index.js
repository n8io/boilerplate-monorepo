import { debounce } from '@boilerplate-monorepo/common';
import { useEffect } from 'react';
import { useModality } from 'shared/useModality';
import { css } from 'styled-components/macro';
import { Modality as ModalityType } from 'types/modality';

const TAB_KEY_CODE = 9;

export const styles = css`
  body[modality='${ModalityType.MOUSE}'] *:focus {
    outline: none !important;
  }

  /* stylelint-disable-next-line no-duplicate-selectors */
  body[modality='${ModalityType.KEYBOARD}'] *:focus {
    outline: calc(var(--layout-base-unit) * 0.375) auto -webkit-focus-ring-color !important;
  }
`;

export const Modality = () => {
  const { update: updateModality } = useModality();

  useEffect(() => {
    const onKeyDown = debounce(e => {
      if (e.keyCode !== TAB_KEY_CODE) return;

      updateModality(ModalityType.KEYBOARD);
    });

    const onMouseDown = debounce(() => updateModality(ModalityType.MOUSE));

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [updateModality]);

  return null;
};
