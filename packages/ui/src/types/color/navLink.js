import { lighten, darken } from 'polished';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { DisplayMode } from '../displayMode';
import { Palette } from './palette';

export const styles = theme('mode', {
  [DisplayMode.DARK]: css`
    background-color: ${Palette.black};
    color: ${lighten(0.15, Palette.primary)};

    &:focus,
    &:hover {
      background-color: ${darken(0.25, Palette.primary)};
      color: ${lighten(0.35, Palette.primary)};
    }

    &.active {
      background-color: ${darken(0.15, Palette.primary)};
      color: ${Palette.white};
      cursor: default;

      &:focus,
      &:hover {
        background-color: ${darken(0.15, Palette.primary)};
        color: ${Palette.white};
      }
    }
  `,
  [DisplayMode.LIGHT]: css`
    background-color: ${Palette.white};
    color: ${Palette.primary};

    &:focus,
    &:hover {
      background-color: ${lighten(0.25, Palette.primary)};
      color: ${darken(0.35, Palette.primary)};
    }

    &.active {
      background-color: ${Palette.primary};
      color: ${Palette.white};
      cursor: default;

      &:focus,
      &:hover {
        background-color: ${Palette.primary};
        color: ${Palette.white};
      }
    }
  `,
});
