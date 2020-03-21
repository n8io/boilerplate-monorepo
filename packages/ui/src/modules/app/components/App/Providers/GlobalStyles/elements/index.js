import { css } from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { styles as themeStyles } from './theme';

export const styles = css`
  html,
  body {
    font-family: ${CustomProperty.FONT_FAMILY};
    font-size: ${CustomProperty.BASE_UNIT};
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
    margin-bottom: ${CustomProperty.BASE_UNIT};
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
    line-height: normal;
    position: relative;
  }

  strong {
    font-weight: bold;
  }

  fieldset[disabled] {
    filter: grayscale(100%);
    opacity: 0.7;
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${themeStyles}
`;
