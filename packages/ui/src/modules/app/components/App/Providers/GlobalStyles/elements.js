import { lighten } from 'polished';
import { pipe, path } from 'ramda';
import { css } from 'styled-components/macro';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';

const themeMode = fn =>
  pipe(
    path(['theme', 'mode']),
    fn
  );

export const styles = css`
  details,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  input,
  select,
  summary {
    margin-bottom: 1rem;
  }

  div,
  footer,
  header,
  main,
  section {
    position: relative;
  }

  pre {
    background: #ffe8e8;
    border-radius: 0.25rem;
    color: #f00;
    font-family: monospace;
    padding: 0.5rem;
  }

  a,
  a:visited {
    color: ${themeMode(mode =>
      mode === DisplayMode.DARK ? lighten(0.2, Color.primary) : Color.primary
    )};
  }

  strong {
    font-weight: bold;
  }
`;
