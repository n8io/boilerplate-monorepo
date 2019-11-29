import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { CustomProperty } from 'types/customProperties';

export const variables = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    &:not([aria-current='page']),
    &:not([aria-current='page']) {
      color: ${CustomProperty.COLOR_PRIMARY_LIGHT};
    }

    &:focus:not([aria-current='page']),
    &:hover:not([aria-current='page']) {
      background-color: ${CustomProperty.NAV_LINK_COLOR_HOVER};
      color: ${CustomProperty.NAV_LINK_BACKGROUND_COLOR_HOVER};
    }

    &[aria-current='page'] {
      background-color: ${CustomProperty.NAV_LINK_BACKGROUND_COLOR};
      color: ${CustomProperty.NAV_LINK_COLOR};

      &:focus,
      &:hover {
        background-color: ${CustomProperty.NAV_LINK_BACKGROUND_COLOR};
        color: ${CustomProperty.NAV_LINK_COLOR};
      }
    }
  `,
});
