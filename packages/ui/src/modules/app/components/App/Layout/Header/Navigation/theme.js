import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { CustomProperty } from 'types/customProperties';

const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    background-color: ${CustomProperty.GRAYSCALE_BLACK};
    box-shadow: inset 1px 0 0px 0px ${CustomProperty.GRAYSCALE_BLACK};
  `,
  [DisplayMode.LIGHT]: css`
    background-color: ${CustomProperty.GRAYSCALE_WHITE};
    box-shadow: inset 1px 0 0px 0px ${CustomProperty.GRAYSCALE_WHITE_2};
  `,
});

export { styles };
