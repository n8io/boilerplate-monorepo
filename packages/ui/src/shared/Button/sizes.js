import { oneOf } from 'prop-types';
import { values } from 'ramda';
import { css } from 'styled-components/macro';

const Size = {
  DEFAULT: 'default',
  LARGE: 'large',
  SMALL: 'small',
};

const styles = css`
  ${({ size = Size.DEFAULT }) => {
    switch (size) {
      case Size.LARGE:
        return css`
          font-size: calc(var(--layout-base-unit) * 1.125);
          padding: var(--layout-base-unit);
        `;
      case Size.SMALL:
        return css`
          font-size: calc(var(--layout-base-unit) * 0.875);
          padding: calc(var(--layout-base-unit) * 0.25);
        `;
      default:
        return css`
          font-size: var(--layout-base-unit);
          padding: calc(var(--layout-base-unit) * 0.5);
        `;
    }
  }}
`;

const propTypes = oneOf(values(Size));

export { Size, propTypes, styles };
