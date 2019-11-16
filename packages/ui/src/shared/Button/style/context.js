import { css } from 'styled-components/macro';
import { variants } from 'styled-theming';
import { DisplayMode } from 'types/displayMode';
import { Theme } from 'types/theme';
import { Context } from '../context';

const styles = variants(Theme.PROP_NAME, Context.PROP_NAME, {
  [Context.DEFAULT]: {
    [DisplayMode.DARK]: css`
      background-color: var(--grayscale-white);
      border-color: var(--grayscale-white);
      color: var(--grayscale-black);
    `,
    [DisplayMode.LIGHT]: css`
      background-color: var(--grayscale-black);
      border-color: var(--grayscale-black);
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
      display: block;
      padding: calc(var(--layout-base-unit) * 0.5);
      width: 100%;

      &[tabindex='0'] {
        background-color: var(--color-type-primary);
        color: var(--grayscale-white);
        cursor: pointer;
      }
    `,
  },
  [Context.PRIMARY]: {
    [DisplayMode.DARK]: css`
      background-color: var(--color-type-primary);
      border-color: var(--color-type-primary);
      color: var(--grayscale-white);
    `,
    [DisplayMode.LIGHT]: css`
      background-color: var(--color-type-primary);
      border-color: var(--color-type-primary);
      color: var(--grayscale-white);
    `,
  },
});

export { styles };
