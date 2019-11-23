import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';

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
