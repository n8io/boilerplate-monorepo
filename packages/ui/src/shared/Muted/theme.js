import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { CustomProperty } from 'types/customProperties';

export const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    color: ${CustomProperty.GRAYSCALE_GRAY_2};
  `,
  [DisplayMode.LIGHT]: css`
    color: ${CustomProperty.GRAYSCALE_BLACK_1};
  `,
});
