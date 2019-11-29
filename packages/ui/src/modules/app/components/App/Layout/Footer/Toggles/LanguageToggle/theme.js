import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { CustomProperty } from 'types/customProperties';

export const menu = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    border: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  `,
});

export const menuItem = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    background-color: ${CustomProperty.COLOR_PRIMARY};
    color: ${CustomProperty.GRAYSCALE_WHITE};

    &[tabindex='0'] {
      background-color: ${CustomProperty.COLOR_PRIMARY_LIGHT};
      color: ${CustomProperty.COLOR_PRIMARY_DARK};
    }
  `,
});
