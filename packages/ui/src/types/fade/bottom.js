import { css } from 'styled-components/macro';
import { bottom as themeStyles } from './theme';

export const bottom = css`
  &::after {
    content: '';
    height: 1.5rem;
    left: var(--layout-base-unit);
    pointer-events: none;
    position: absolute;
    right: var(--layout-base-unit);
    top: calc((-1.5 - 0.05675) * 1rem);
    z-index: 10;

    /* stylelint-disable-next-line order/properties-alphabetical-order */
    ${themeStyles}
  }
`;
