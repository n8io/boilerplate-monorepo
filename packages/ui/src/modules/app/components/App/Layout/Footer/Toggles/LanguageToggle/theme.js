import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { DisplayMode } from 'types/displayMode';
import { Theme } from 'types/theme';

export const menu = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    border: 1px solid var(--border-color);
  `,
});

export const menuItem = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    background-color: var(--color-type-primary);
    color: var(--grayscale-white);

    &[tabindex='0'] {
      background-color: var(--color-type-primary-light);
      color: var(--color-type-primary-dark);
    }
  `,
});
