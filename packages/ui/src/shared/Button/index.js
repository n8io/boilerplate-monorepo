import { noop } from '@puttingpoker/common';
import { func, node, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { DisplayMode } from 'types/displayMode';
import { Layout } from 'types/layout';

const domTestId = 'Button';

const { black, white } = Color;
const { DARK, LIGHT } = DisplayMode;
const { COMFORTABLE, COMPACT, DEFAULT } = Layout;

const modeStyles = theme('mode', {
  [DARK]: {
    backgroundColor: white,
    color: black,
  },
  [LIGHT]: {
    backgroundColor: black,
    color: white,
  },
});

const layoutStyles = theme('layout', {
  [COMFORTABLE]: {
    padding: '0.5rem',
  },
  [COMPACT]: {
    padding: '0.375rem',
  },
  [DEFAULT]: {
    padding: '0.675rem',
  },
});

const Styled = styled.button`
  border-radius: 0.125rem;
  
  ${layoutStyles} 
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
