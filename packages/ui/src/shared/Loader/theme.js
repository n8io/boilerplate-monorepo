import { Color } from '@boilerplate-monorepo/common';
import { DisplayMode, Theme } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { CustomProperty } from 'types/customProperties';

const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    border-color: ${CustomProperty.COLOR_PRIMARY_LIGHT} transparent transparent
      transparent;
  `,
  [DisplayMode.LIGHT]: css`
    --spinner-color: var(--spinner-color-override, ${Color.PRIMARY});

    border-color: var(--spinner-color) transparent transparent transparent;
  `,
});

export { styles };
