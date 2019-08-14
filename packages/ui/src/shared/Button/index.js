import { noop } from '@puttingpoker/common';
import { func, node, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';

const domTestId = 'Button';

const modeStyles = theme('mode', {
  [DisplayMode.DARK]: {
    backgroundColor: Color.white,
    color: Color.black,
  },
  [DisplayMode.LIGHT]: {
    backgroundColor: Color.black,
    color: Color.white,
  },
});

const Styled = styled.button`
  border-radius: 0.125rem;

  ${modeStyles}
  ${({ className }) => className}
`;

const Button = ({ children, className, label, onClick, text, type }) => (
  <Styled
    aria-label={label || text}
    className={className}
    data-testid={domTestId}
    onClick={onClick}
    type={type}
  >
    {children || text}
  </Styled>
);

Button.defaultProps = {
  children: undefined,
  className: undefined,
  label: undefined,
  onClick: noop,
  type: 'button',
};

Button.propTypes = {
  children: node,
  className: string,
  label: string,
  onClick: func,
  text: ({ children, text }) => {
    if (children || text) return undefined;

    return new Error(`The 'text' is required when no children are provided`);
  },
  type: string,
};

export { domTestId, Button };
