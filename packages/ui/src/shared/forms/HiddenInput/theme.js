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

const input = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    background-color: ${CustomProperty.GRAYSCALE_WHITE_2};
    border: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};

    &[aria-invalid='true'] {
      border-color: ${CustomProperty.COLOR_ERROR_DARK};
    }
  `,
  [DisplayMode.LIGHT]: css`
    background-color: ${CustomProperty.GRAYSCALE_WHITE};
    border: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};

    &[aria-invalid='true'] {
      border-color: ${CustomProperty.COLOR_ERROR};
    }
  `,
});

const styles = { error, input };

export { styles };
