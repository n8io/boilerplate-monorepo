import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { CustomProperty } from 'types/customProperties';

const error = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    color: ${CustomProperty.COLOR_ERROR_DARK};
  `,
  [DisplayMode.LIGHT]: css`
    color: ${CustomProperty.COLOR_ERROR};
  `,
});

const styles = { error };

export { styles };
