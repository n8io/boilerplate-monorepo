import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { DisplayMode } from 'types/displayMode';
import { Theme } from 'types/theme';

export const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    a {
      color: var(--color-type-primary-light);

      &:focus,
      &:hover {
        color: var(--grayscale-gray-1);
      }
    }
  `,
});
