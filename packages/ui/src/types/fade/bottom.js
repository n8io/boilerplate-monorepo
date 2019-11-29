import { css } from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { bottom as themeStyles } from './theme';

export const bottom = css`
  &::after {
    content: '';
    height: ${CustomProperty.BASE_UNIT};
    left: ${CustomProperty.BASE_UNIT};
    pointer-events: none;
    position: absolute;
    right: ${CustomProperty.BASE_UNIT};
    top: calc(
      ${CustomProperty.BASE_UNIT} -
        (${CustomProperty.BASE_UNIT} * 2) + -1px
    );
    z-index: ${CustomProperty.Z_INDEX_FADE};

    /* stylelint-disable-next-line order/properties-alphabetical-order */
    ${themeStyles}
  }
`;
