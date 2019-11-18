import { css } from 'styled-components/macro';
import { bottom as themeStyles } from './theme';

export const bottom = css`
  &::after {
    content: '';
    height: var(--layout-base-unit);
    left: var(--layout-base-unit);
    pointer-events: none;
    position: absolute;
    right: var(--layout-base-unit);
    top: calc(var(--layout-base-unit) - (var(--layout-base-unit) * 2) + -1px);
    z-index: 10;

    /* stylelint-disable-next-line order/properties-alphabetical-order */
    ${themeStyles}
  }
`;
