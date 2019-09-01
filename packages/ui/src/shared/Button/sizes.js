import { oneOf } from 'prop-types';
import { values } from 'ramda';
import { css } from 'styled-components/macro';
import { Layout } from 'types/layout';

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
          font-size: ${1.125 * Layout.BASE_UNIT}rem;
          padding: ${Layout.BASE_UNIT}rem;
        `;
      case Size.SMALL:
        return css`
          font-size: ${0.875 * Layout.BASE_UNIT}rem;
          padding: ${0.25 * Layout.BASE_UNIT}rem;
        `;
      default:
        return css`
          font-size: ${Layout.BASE_UNIT}rem;
          padding: ${0.5 * Layout.BASE_UNIT}rem;
        `;
    }
  }}
`;

const propTypes = oneOf(values(Size));

export { Size, propTypes, styles };
