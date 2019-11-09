import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { DisplayMode } from '../displayMode';

export const styles = theme('mode', {
  [DisplayMode.DARK]: css`
    color: var(--link-color);

    &:focus,
    &:hover {
      color: var(--link-color-hover);
    }
  `,
  [DisplayMode.LIGHT]: css`
    color: var(--link-color);

    &:focus,
    &:hover {
      color: var(--link-color-hover);
    }
  `,
});
