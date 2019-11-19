import { css } from 'styled-components/macro';
import { styles as customStyles } from './custom';
import { styles as grayscaleStyles } from './grayscale';
import { styles as layoutStyles } from './layout';
import { styles as roygbivStyles } from './roygbiv';
import { styles as transitionStyles } from './transition';
import { styles as zIndexStyles } from './zIndex';

export const styles = css`
  :root {
    ${layoutStyles}
    ${transitionStyles}
    ${grayscaleStyles}
    ${roygbivStyles}
    ${zIndexStyles}
    ${customStyles}
  }
`;
