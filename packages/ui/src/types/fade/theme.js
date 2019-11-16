import { css } from 'styled-components/macro';
import theme from 'styled-theming';
import { DisplayMode } from 'types/displayMode';
import { Theme } from 'types/theme';

export const bottom = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--grayscale-black) 100%
    );
  `,
  [DisplayMode.LIGHT]: css`
    background: #ffffff00;
    background: linear-gradient(to bottom, #ffffff00, #ffffffff);
  `,
});

export const top = theme(Theme.PROP_NAME, {
  [DisplayMode.DARK]: css`
    background: linear-gradient(
      to top,
      transparent 0%,
      var(--grayscale-black) 100%
    );
  `,
  [DisplayMode.LIGHT]: css`
    background: #ffffff00;
    background: linear-gradient(to top, #ffffff00, #ffffffff);
  `,
});
