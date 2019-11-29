import { css } from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { Size } from '../size';

const styles = css`
  ${({ size = Size.DEFAULT }) => {
    switch (size) {
      case Size.LARGE:
        return css`
          font-size: calc(${CustomProperty.BASE_UNIT} * 1.125);
          padding: ${CustomProperty.BASE_UNIT};
        `;
      case Size.SMALL:
        return css`
          font-size: calc(${CustomProperty.BASE_UNIT} * 0.875);
          padding: calc(${CustomProperty.BASE_UNIT} * 0.25);
        `;
      default:
        return css`
          font-size: ${CustomProperty.BASE_UNIT};
          padding: calc(${CustomProperty.BASE_UNIT} * 0.5);
        `;
    }
  }}
`;

export { styles };
