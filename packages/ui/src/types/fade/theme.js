import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { CustomProperty } from 'types/customProperties';

export const bottom = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${CustomProperty.GRAYSCALE_BLACK} 100%
    );
  `,
  [DisplayMode.LIGHT]: css`
    background: ${CustomProperty.COLOR_TRANSPARENT};
    background: linear-gradient(
      to bottom,
      ${CustomProperty.COLOR_TRANSPARENT},
      ${CustomProperty.GRAYSCALE_WHITE}
    );
  `,
});

export const top = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    background: linear-gradient(
      to top,
      transparent 0%,
      ${CustomProperty.GRAYSCALE_BLACK} 100%
    );
  `,
  [DisplayMode.LIGHT]: css`
    background: ${CustomProperty.COLOR_TRANSPARENT};
    background: linear-gradient(
      to top,
      ${CustomProperty.COLOR_TRANSPARENT},
      ${CustomProperty.GRAYSCALE_WHITE}
    );
  `,
});
