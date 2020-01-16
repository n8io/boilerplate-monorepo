import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { CustomProperty } from 'types/customProperties';

export const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    &:not([aria-current='page']) {
      color: ${CustomProperty.COLOR_PRIMARY_LIGHT};
    }

    &[aria-current='page'] {
      color: ${CustomProperty.GRAYSCALE_WHITE_2};
    }
  `,
  [DisplayMode.LIGHT]: css`
    &:not([aria-current='page']) {
      color: ${CustomProperty.COLOR_PRIMARY};
    }

    &[aria-current='page'] {
      color: ${CustomProperty.GRAYSCALE_BLACK_2};
    }
  `,
});
