import { darken, lighten } from 'polished';
import { oneOf } from 'prop-types';
import { values } from 'ramda';
import { css } from 'styled-components/macro';
import { variants } from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';

const contextProp = 'context';
const themeProp = 'mode';

const Context = {
  DEFAULT: 'default',
  MENU_ITEM: 'menuItem',
  PRIMARY: 'primary',
};

const styles = variants(themeProp, contextProp, {
  [Context.DEFAULT]: {
    [DisplayMode.DARK]: css`
      background-color: ${Color.white};
      border-color: ${lighten(0.2, Color.white)};
      color: ${Color.black};
    `,
    [DisplayMode.LIGHT]: css`
      background-color: ${Color.black};
      border-color: ${darken(0.2, Color.black)};
      color: ${Color.white};
    `,
  },
  [Context.MENU_ITEM]: {
    [DisplayMode.DARK]: css`
      background-color: ${Color.white};
      border-color: transparent;
      color: ${Color.primary};
    `,
    [DisplayMode.LIGHT]: css`
      background-color: ${Color.primary};
      border-color: transparent;
      color: ${Color.white};
    `,
  },
  [Context.PRIMARY]: {
    [DisplayMode.DARK]: css`
      background-color: ${Color.white};
      border-color: ${Color.primary};
      color: ${Color.primary};
    `,
    [DisplayMode.LIGHT]: css`
      background-color: ${Color.primary};
      border-color: ${darken(0.2, Color.primary)};
      color: ${Color.white};
    `,
  },
});

const propTypes = oneOf(values(Context));

export { Context, propTypes, styles };
