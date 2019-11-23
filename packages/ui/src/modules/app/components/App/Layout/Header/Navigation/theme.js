import { DisplayMode } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { Theme } from 'types/theme';

const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    background-color: var(--grayscale-black);
    box-shadow: inset 1px 0 0px 0px var(--grayscale-black);
  `,
  [DisplayMode.LIGHT]: css`
    background-color: var(--grayscale-white);
    box-shadow: inset 1px 0 0px 0px var(--grayscale-white-2);
  `,
});

export { styles };
