import { noop } from '@puttingpoker/common';
import { bool, func, node, string } from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components/macro';
import {
  Size,
  propTypes as sizePropTypes,
  styles as sizeStyles,
} from './sizes';
import {
  Context,
  propTypes as contextPropTypes,
  styles as contextStyles,
} from './variants';

const domTestId = 'Button';

const Styled = styled.button`
  border-radius: 0.125rem;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: grid;
  justify-items: center;
  opacity: 1;
  text-align: center;
  width: 100%;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${contextStyles}
  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${sizeStyles}

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

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${({ className }) => className}
`;

const Button = ({
  children,
  className,
  context,
  'data-testid': dataTestId,
  disabled,
  label,
  onClick,
  text,
  type,
  ...props
}) => (
  <Styled
    {...props}
    aria-disabled={disabled}
    aria-label={label || text}
    className={className}
    context={context}
    data-testid={dataTestId}
    disabled={disabled}
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
  'data-testid': domTestId,
  disabled: false,
  label: undefined,
  onClick: noop,
  size: Size.DEFAULT,
  type: 'button',
};

Button.propTypes = {
  children: node,
  className: string,
  context: contextPropTypes,
  'data-testid': string,
  disabled: bool,
  label: ({ label, text }) => {
    if (text || label) return undefined;

    return new Error('The `label` prop is required when no text is set');
  },
  onClick: func,
  size: sizePropTypes,
  text: ({ children, text }) => {
    if (children || text) return undefined;

    return new Error(
      `The 'text' prop is required when no children are provided`
    );
  },
  type: string,
};

export { Button, Context, Size, domTestId };
