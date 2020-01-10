import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { CustomProperty } from 'types/customProperties';

export const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    color: ${CustomProperty.COLOR_PRIMARY_LIGHT};

    &:focus,
    &:hover {
      color: ${CustomProperty.GRAYSCALE_GRAY_1};
    }
  `,
  [DisplayMode.LIGHT]: css`
    color: ${CustomProperty.LINK_COLOR};

    &:focus,
    &:hover {
      color: ${CustomProperty.LINK_COLOR};
    }
  `,
});
