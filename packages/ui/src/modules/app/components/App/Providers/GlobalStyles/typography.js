import { css } from 'styled-components/macro';

const coefficient = 1.5;
const decrement = size => coefficient - (size - 1) * 0.075;
const sizes = Array.from({ length: 6 }, (_, k) => k + 1); // [1,2,3,...]

const generateHeaderStyle = size => `
  h${size} {
    font-size: calc(var(--layout-base-unit) * ${decrement(size)});
    user-select: none;
  }
`;

export const styles = css`
  ${sizes.map(generateHeaderStyle)}
`;
