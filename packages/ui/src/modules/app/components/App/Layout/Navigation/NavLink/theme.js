import { DisplayMode } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { Theme } from 'types/theme';

export const variables = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    &:not([aria-current='page']),
    &:not([aria-current='page']) {
      color: var(--color-type-primary-light);
    }

    &:focus:not([aria-current='page']),
    &:hover:not([aria-current='page']) {
      background-color: var(--nav-link-color-hover);
      color: var(--nav-link-background-color-hover);
    }

    &[aria-current='page'] {
      background-color: var(--nav-link-background-color);
      color: var(--nav-link-color);

      &:focus,
      &:hover {
        background-color: var(--nav-link-background-color);
        color: var(--nav-link-color);
      }
    }
  `,
});
