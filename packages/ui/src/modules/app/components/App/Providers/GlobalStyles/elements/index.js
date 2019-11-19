import { css } from 'styled-components/macro';
import { styles as themeStyles } from './theme';

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
    font-size: var(--layout-base-unit);
    margin-bottom: var(--layout-base-unit);
  }

  blockquote,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li,
  ol,
  p,
  pre,
  table,
  td,
  th,
  tr,
  ul {
    user-select: text;
  }

  div,
  footer,
  header,
  main,
  section {
    font-size: var(--layout-base-unit);
    line-height: normal;
    position: relative;
  }

  pre {
    background-color: var(--color-type-error-light);
    border-radius: calc(var(--layout-base-unit) * 0.25);
    color: var(--color-type-error);
    font-family: monospace;
    padding: calc(var(--layout-base-unit) * 0.5);
  }

  a {
    color: var(--link-color);

    &:focus,
    &:hover {
      color: var(--link-color-hover);
    }
  }

  strong {
    font-weight: bold;
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${themeStyles}
`;
