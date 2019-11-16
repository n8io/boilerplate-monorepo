import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { DisplayMode } from 'types/displayMode';
import { Theme } from 'types/theme';

export const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    background-color: var(--color-type-primary);
    color: var(--grayscale-white);
    display: block;
    padding: calc(var(--layout-base-unit) * 0.5);
    width: 100%;

    &[tabindex='0'] {
      background-color: var(--color-type-primary-light);
      color: var(--color-type-primary-dark);
      cursor: pointer;
    }
  `,
});
