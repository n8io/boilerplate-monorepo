import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { CustomProperty } from 'types/customProperties';

export const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    border: 1px solid ${CustomProperty.COLOR_PRIMARY_LIGHT};
    border-top: 0;
    color: ${CustomProperty.COLOR_PRIMARY_LIGHT};

    &:focus {
      background-color: ${CustomProperty.GRAYSCALE_BLACK};
      color: ${CustomProperty.COLOR_PRIMARY_LIGHT};
    }
  `,
  [DisplayMode.LIGHT]: css`
    border: 1px solid ${CustomProperty.COLOR_PRIMARY};
    color: ${CustomProperty.COLOR_PRIMARY};

    &:focus {
      background-color: ${CustomProperty.GRAYSCALE_WHITE};
      color: ${CustomProperty.COLOR_PRIMARY};
    }
  `,
});
