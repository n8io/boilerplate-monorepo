import { css } from 'styled-components/macro';
import { top as themeStyles } from './theme';

export const top = css`
  &::before {
    bottom: calc((-1.5 - 0.05675) * 1rem);
    content: '';
    height: 1.5rem;
    left: var(--layout-base-unit);
    pointer-events: none;
    position: absolute;
    right: var(--layout-base-unit);
    z-index: 10;

    /* stylelint-disable-next-line order/properties-alphabetical-order */
    ${themeStyles}
  }
`;
