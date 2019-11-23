import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';

const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    border-color: var(--color-type-primary-light) transparent transparent
      transparent;
  `,
  [DisplayMode.LIGHT]: css`
    border-color: var(--color-type-primary) transparent transparent transparent;
  `,
});

export { styles };
