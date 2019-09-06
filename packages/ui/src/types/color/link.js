import { lighten, darken } from 'polished';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { DisplayMode } from '../displayMode';
import { Palette } from './palette';

export const styles = theme('mode', {
  [DisplayMode.DARK]: css`
    color: ${lighten(0.15, Palette.primary)};

    &:focus,
    &:hover {
      color: ${lighten(0.35, Palette.primary)};
    }
  `,
  [DisplayMode.LIGHT]: css`
    background-color: ${Palette.white};
    color: ${Palette.primary};

    &:focus,
    &:hover {
      color: ${darken(0.35, Palette.primary)};
    }
  `,
});
