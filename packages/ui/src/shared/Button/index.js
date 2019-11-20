import { bool, func, node, string } from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components/macro';
import { A11y } from 'types/a11y';
import { Context } from './context';
import { Size } from './size';
import { Style } from './style';
import { Type } from './type';

const { Role } = A11y;

const domTestId = 'Button';

const styles = css` 
  border-radius: 0.125rem;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: grid;
  justify-items: center;
  opacity: 0.95;
  text-align: center;
  transition: opacity var(--transition-delay) var(--transition-timing-function);
  width: 100%;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${Style.context}
  ${Style.size}

  &:active,
  &:focus,
  &:hover {
    opacity: 1;
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

const Styled = styled.button`
  ${styles}
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
    role={Role.BUTTON}
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
  size: Size.DEFAULT,
  type: Type.BUTTON,
};

Button.propTypes = {
  children: node,
  className: string,
  context: Context.propTypes,
  'data-testid': string,
  disabled: bool,
  label: ({ label, text }) => {
    if (text || label) return undefined;

    return new Error('The `label` prop is required when no text is set');
  },
  onClick: func.isRequired,
  size: Size.propTypes,
  text: ({ children, text }) => {
    if (children || text) return undefined;

    return new Error(
      `The 'text' prop is required when no children are provided`
    );
  },
  type: Type.propTypes,
};

export { Button, Context, Size, domTestId, styles };
