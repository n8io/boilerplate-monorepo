import { css } from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { top as themeStyles } from './theme';

export const top = css`
  &::before {
    bottom: calc(
      ${CustomProperty.BASE_UNIT} - (${CustomProperty.BASE_UNIT} * 2) + -1px
    );
    content: '';
    height: ${CustomProperty.BASE_UNIT};
    left: 1px;
    pointer-events: none;
    position: absolute;
    right: 1px;
    z-index: ${CustomProperty.Z_INDEX_FADE};

    /* stylelint-disable-next-line order/properties-alphabetical-order */
    ${themeStyles}
  }
`;
