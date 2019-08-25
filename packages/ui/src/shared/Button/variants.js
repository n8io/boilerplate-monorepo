import { darken, lighten } from 'polished';
import { variants } from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';

const contextProp = 'context';
const themeProp = 'mode';

const Context = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
};

const backgroundColor = variants(themeProp, contextProp, {
  [Context.DEFAULT]: {
    [DisplayMode.DARK]: Color.white,
    [DisplayMode.LIGHT]: Color.black,
  },
  [Context.PRIMARY]: {
    [DisplayMode.DARK]: Color.white,
    [DisplayMode.LIGHT]: Color.primary,
  },
});

const border = variants(themeProp, contextProp, {
  [Context.DEFAULT]: {
    [DisplayMode.DARK]: `1px solid ${lighten(0.2, Color.white)}`,
    [DisplayMode.LIGHT]: `1px solid ${darken(0.2, Color.black)}`,
  },
  [Context.PRIMARY]: {
    [DisplayMode.DARK]: `1px solid ${Color.primary}`,
    [DisplayMode.LIGHT]: `1px solid ${darken(0.2, Color.primary)}`,
  },
});

const color = variants(themeProp, contextProp, {
  [Context.DEFAULT]: {
    [DisplayMode.DARK]: Color.black,
    [DisplayMode.LIGHT]: Color.white,
  },
  [Context.PRIMARY]: {
    [DisplayMode.DARK]: Color.primary,
    [DisplayMode.LIGHT]: Color.white,
  },
});

export const Variants = {
  Context,
  backgroundColor,
  border,
  color,
};
