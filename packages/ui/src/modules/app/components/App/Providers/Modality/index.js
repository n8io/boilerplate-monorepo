import { Utils } from '@boilerplate-monorepo/common';
import { Modality as ModalityType } from '@boilerplate-monorepo/ui-common';
import { useEffect } from 'react';
import { useModality } from 'shared/useModality';
import { css } from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';

const TAB_KEY_CODE = 9;

export const styles = css`
  body[modality='${ModalityType.MOUSE}'] *:focus {
    outline: none !important;
  }

  /* stylelint-disable-next-line no-duplicate-selectors */
  body[modality='${ModalityType.KEYBOARD}'] *:focus {
    outline: calc(${CustomProperty.BASE_UNIT} * 0.375) auto -webkit-focus-ring-color !important;
  }
`;

export const Modality = () => {
  const { update: updateModality } = useModality();

  useEffect(() => {
    const onKeyDown = Utils.debounce(e => {
      if (e.keyCode !== TAB_KEY_CODE) return;

      updateModality(ModalityType.KEYBOARD);
    });

    const onMouseDown = Utils.debounce(() =>
      updateModality(ModalityType.MOUSE)
    );

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [updateModality]);

  return null;
};
