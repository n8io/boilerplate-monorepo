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
    background: var(--color-type-transparent);
    background: linear-gradient(
      to bottom,
      var(--color-type-transparent),
      var(--grayscale-white)
    );
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
    background: var(--color-type-transparent);
    background: linear-gradient(
      to top,
      var(--color-type-transparent),
      var(--grayscale-white)
    );
  `,
});
