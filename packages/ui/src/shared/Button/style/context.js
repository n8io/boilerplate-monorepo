import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import { variants } from 'styled-theming';
import { CustomProperty } from 'types/customProperties';
import { Context } from '../context';

const styles = variants(Theme.PROP_NAME, Context.PROP_NAME, {
  [Context.DEFAULT]: {
    [DisplayMode.DARK]: css`
      background-color: ${CustomProperty.GRAYSCALE_WHITE};
      border-color: ${CustomProperty.GRAYSCALE_WHITE};
      color: ${CustomProperty.GRAYSCALE_BLACK};
    `,
    [DisplayMode.LIGHT]: css`
      background-color: ${CustomProperty.GRAYSCALE_BLACK};
      border-color: ${CustomProperty.GRAYSCALE_BLACK};
      color: ${CustomProperty.GRAYSCALE_WHITE};
    `,
  },
  [Context.LINK]: {
    [DisplayMode.DARK]: css`
      background-color: ${CustomProperty.COLOR_TRANSPARENT};
      border-color: ${CustomProperty.COLOR_TRANSPARENT};
      color: ${CustomProperty.GRAYSCALE_WHITE_2};
    `,
    [DisplayMode.LIGHT]: css`
      background-color: ${CustomProperty.COLOR_TRANSPARENT};
      border-color: ${CustomProperty.COLOR_TRANSPARENT};
      color: ${CustomProperty.GRAYSCALE_PRIMARY};
    `,
  },
  [Context.MENU_ITEM]: {
    [DisplayMode.DARK]: css`
      background-color: ${CustomProperty.GRAYSCALE_WHITE};
      border-color: transparent;
      color: ${CustomProperty.COLOR_PRIMARY};
    `,
    [DisplayMode.LIGHT]: css`
      background-color: ${CustomProperty.COLOR_PRIMARY};
      border-color: transparent;
      color: ${CustomProperty.GRAYSCALE_WHITE};
      display: block;
      padding: calc(${CustomProperty.BASE_UNIT_0_5});
      width: 100%;

      &[tabindex='0'] {
        background-color: ${CustomProperty.COLOR_PRIMARY};
        color: ${CustomProperty.GRAYSCALE_WHITE};
        cursor: pointer;
      }
    `,
  },
  [Context.PRIMARY]: {
    [DisplayMode.DARK]: css`
      background-color: ${CustomProperty.COLOR_PRIMARY};
      border-color: ${CustomProperty.COLOR_PRIMARY};
      color: ${CustomProperty.GRAYSCALE_WHITE};
    `,
    [DisplayMode.LIGHT]: css`
      background-color: ${CustomProperty.COLOR_PRIMARY};
      border-color: ${CustomProperty.COLOR_PRIMARY};
      color: ${CustomProperty.GRAYSCALE_WHITE};
    `,
  },
});

export { styles };
