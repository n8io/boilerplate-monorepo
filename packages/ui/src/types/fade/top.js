import { css } from 'styled-components/macro';
import { top as themeStyles } from './theme';

export const top = css`
  &::before {
    bottom: calc(
      var(--layout-base-unit) - (var(--layout-base-unit) * 2) + -1px
    );
    content: '';
    height: var(--layout-base-unit);
    left: var(--layout-base-unit);
    pointer-events: none;
    position: absolute;
    right: var(--layout-base-unit);
    z-index: 10;

    /* stylelint-disable-next-line order/properties-alphabetical-order */
    ${themeStyles}
  }
`;
