import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { DisplayMode } from 'types/displayMode';
import { Theme } from 'types/theme';

export const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    border: 1px solid var(--color-type-primary-light);
    border-top: 0;
    color: var(--color-type-primary-light);

    &:focus {
      background-color: var(--grayscale-black);
      color: var(--color-type-primary-light);
    }
  `,
  [DisplayMode.LIGHT]: css`
    border: 1px solid var(--color-type-primary);
    color: var(--color-type-primary);

    &:focus {
      background-color: var(--grayscale-white);
      color: var(--color-type-primary);
    }
  `,
});
