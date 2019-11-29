import { css } from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';

const coefficient = 1.5;
const decrement = size => coefficient - (size - 1) * 0.075;
const sizes = Array.from({ length: 6 }, (_, k) => k + 1); // [1,2,3,...]

const generateHeaderStyle = size => `
  h${size} {
    font-size: calc(${CustomProperty.BASE_UNIT} * ${decrement(size)});
    font-weight: bold;
    user-select: none;
  }
`;

export const styles = css`
  ${sizes.map(generateHeaderStyle)}
`;
