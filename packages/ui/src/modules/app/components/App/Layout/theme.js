import { DisplayMode } from '@boilerplate-monorepo/ui-common';
import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { Theme } from 'types/theme';

export const styles = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    --border-color: var(--grayscale-black-1);

    background-color: var(--grayscale-black);
    color: var(--grayscale-white-2);
  `,
});
