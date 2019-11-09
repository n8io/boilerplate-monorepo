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
      background-color: var(--grayscale-white);
      border-color: ${lighten(0.2, Color.white)};
      color: ${Color.black};
    `,
    [DisplayMode.LIGHT]: css`
      background-color: ${Color.black};
      border-color: ${darken(0.2, Color.black)};
      color: var(--grayscale-white);
    `,
  },
  [Context.MENU_ITEM]: {
    [DisplayMode.DARK]: css`
      background-color: var(--grayscale-white);
      border-color: transparent;
      color: var(--color-type-primary);
    `,
    [DisplayMode.LIGHT]: css`
      background-color: var(--color-type-primary);
      border-color: transparent;
      color: var(--grayscale-white);
    `,
  },
  [Context.PRIMARY]: {
    [DisplayMode.DARK]: css`
      background-color: var(--grayscale-white);
      border-color: var(--color-type-primary);
      color: var(--color-type-primary);
    `,
    [DisplayMode.LIGHT]: css`
      background-color: var(--color-type-primary);
      border-color: ${darken(0.2, Color.primary)};
      color: var(--grayscale-white);
    `,
  },
});

const propTypes = oneOf(values(Context));

export { Context, propTypes, styles };
