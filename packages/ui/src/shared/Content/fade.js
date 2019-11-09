import { rgba } from 'polished';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';

const HEIGHT = 1.5;
const WIDTH = 1;
const BOTTOM = 'bottom';
const TOP = 'top';

const themeStyles = placement =>
  theme('mode', {
    [DisplayMode.DARK]: css`
      background: linear-gradient(
        to ${placement},
        ${rgba(Color.black, 0)} 0%,
        ${Color.black} 80%,
        ${Color.black} 100%
      );
    `,
    [DisplayMode.LIGHT]: css`
      background: linear-gradient(
        to ${placement},
        ${rgba(Color.white, 0)} 0%,
        var(--grayscale-white) 80%,
        var(--grayscale-white) 100%
      );
    `,
  });

export const bottomStyles = css`
  &::after {
    content: '';
    height: ${HEIGHT}rem;
    left: ${WIDTH}rem;
    pointer-events: none;
    position: absolute;
    right: ${WIDTH}rem;
    top: ${-1 * HEIGHT - 0.05675}rem;
    z-index: 10;

    /* stylelint-disable-next-line order/properties-alphabetical-order */
    ${themeStyles(BOTTOM)}
  }
`;

export const topStyles = css`
  &::before {
    bottom: ${-1 * HEIGHT - 0.05675}rem;
    content: '';
    height: ${HEIGHT}rem;
    left: ${WIDTH}rem;
    pointer-events: none;
    position: absolute;
    right: ${WIDTH}rem;
    z-index: 10;

    /* stylelint-disable-next-line order/properties-alphabetical-order */
    ${themeStyles(TOP)}
  }
`;
