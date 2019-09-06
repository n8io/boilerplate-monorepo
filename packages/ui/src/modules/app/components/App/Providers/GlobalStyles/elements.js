import { css } from 'styled-components/macro';
import { Color } from 'types/color';

export const styles = css`
  html,
  body {
    height: 100vh;
    width: 100vw;
  }

  details,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  input,
  p,
  pre,
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
    ${Color.linkStyles}
  }

  strong {
    font-weight: bold;
  }
`;
