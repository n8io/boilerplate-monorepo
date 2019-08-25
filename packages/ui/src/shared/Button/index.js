import { noop } from '@puttingpoker/common';
import { bool, func, node, oneOf, string } from 'prop-types';
import { values } from 'ramda';
import React from 'react';
import styled, { css } from 'styled-components/macro';
import { Variants } from './variants';

const domTestId = 'Button';
const { Context } = Variants;

const Styled = styled.button`
  background-color: ${Variants.backgroundColor};
  border: ${Variants.border};
  border-radius: 0.125rem;
  color: ${Variants.color};
  cursor: pointer;

  opacity: 1;

  &:active,
  &:focus,
  &:hover {
    opacity: 0.95;
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      opacity: 0.7;
      pointer-events: none;

      &:active,
      &:focus,
      &:hover {
        cursor: default;
        opacity: 0.7;
        pointer-events: none;
      }
    `}

  transition: all 200ms ease;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${({ className }) => className}
`;

const Button = ({
  children,
  className,
  context,
  disabled,
  label,
  onClick,
  text,
  type,
}) => (
  <Styled
    aria-disabled={disabled}
    aria-label={label || text}
    className={className}
    context={context}
    disabled={Boolean(disabled)}
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
  context: Context.DEFAULT,
  disabled: false,
  label: undefined,
  onClick: noop,
  type: 'button',
};

Button.propTypes = {
  children: node,
  className: string,
  context: oneOf(values(Context)),
  disabled: bool,
  label: string,
  onClick: func,
  text: ({ children, text }) => {
    if (children || text) return undefined;

    return new Error(`The 'text' is required when no children are provided`);
  },
  type: string,
};

export { domTestId, Button, Context };
