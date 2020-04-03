import { Utils } from '@boilerplate-monorepo/common';
import { A11y } from '@boilerplate-monorepo/ui-common';
import { bool, func, node, string } from 'prop-types';
import { path } from 'ramda';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { animated, useSpring } from 'react-spring';
import styled, { css } from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { Loader } from '../Loader';
import { Context } from './context';
import { Size } from './size';
import { Style } from './style';
import { Type } from './type';

const { Role } = A11y;

const styles = css`
  align-items: center;
  border-radius: 0.125rem;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: grid;
  justify-items: center;
  opacity: 0.95;
  position: relative;
  text-align: center;
  transition: opacity ${CustomProperty.TRANSITION_DELAY} ${
  CustomProperty.TRANSITION_TIMING_FUNCTION
};
  vertical-align: middle;
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

  ${({ isAutoWidth }) =>
    isAutoWidth &&
    css`
      width: fit-content;
    `}

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${({ className }) => className}

  ${({ height, width }) =>
    height &&
    width &&
    css`
      height: ${height}px;
      width: ${width}px;
    `}
`;

const StyledButton = styled.button`
  ${styles}
`;

const StyledFancyLoader = animated(styled.div`
  display: grid;
  position: relative;
`);

const FancyLoader = fadeStyles => (
  <StyledFancyLoader style={fadeStyles}>
    <Loader />
  </StyledFancyLoader>
);

const StyledFancyContent = animated(styled.div`
  display: grid;
  position: relative;
`);

const FancyContent = ({ children, ...fadeStyles }) => (
  <StyledFancyContent style={fadeStyles}>{children}</StyledFancyContent>
);

FancyContent.propTypes = {
  children: node.isRequired,
};

// eslint-disable-next-line complexity, max-statements
const Button = ({
  children,
  className,
  context,
  disabled,
  isAutoWidth,
  label,
  onClick,
  text,
  type,
  ...props
}) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const formProps = useFormContext();
  const isSubmitting = path(['formState', 'isSubmitting'], formProps);
  const [isLoaderVisible, beLoaderVisible] = useState(isSubmitting);
  const fadeOutProps = useSpring({ opacity: isLoaderVisible ? 1 : 0 });
  const fadeInProps = useSpring({ opacity: isLoaderVisible ? 0 : 1 });
  const ref = useRef(null);

  const content = children || text;

  useEffect(() => {
    if (!ref.current) return;

    const {
      height: rectHeight,
      width: rectWidth,
    } = ref.current.getBoundingClientRect();

    if (rectHeight) {
      setHeight(rectHeight);
    }

    if (rectWidth) {
      setWidth(rectWidth);
    }
  }, [content, isSubmitting]);

  useEffect(() => {
    if (isSubmitting) {
      beLoaderVisible(true);
    }

    // Show loader a bits longer to avoid loading flash
    if (!isSubmitting && isLoaderVisible) {
      const timeout = setTimeout(() => beLoaderVisible(false), 400);

      // Don’t forget to clear the timeout
      return () => clearTimeout(timeout);
    }

    return () => null;
  }, [isLoaderVisible, isSubmitting]);

  const isDisabled = disabled || isLoaderVisible;

  return (
    <StyledButton
      {...props}
      aria-disabled={isDisabled}
      aria-label={label || text}
      className={className}
      context={context}
      disabled={isDisabled}
      height={height}
      isAutoWidth={isAutoWidth}
      onClick={onClick}
      ref={ref}
      role={Role.BUTTON}
      type={type}
      width={width}
    >
      {isLoaderVisible ? (
        <FancyLoader {...fadeOutProps} />
      ) : (
        <FancyContent {...fadeInProps}>{content}</FancyContent>
      )}
    </StyledButton>
  );
};

Button.defaultProps = {
  children: undefined,
  className: undefined,
  context: Context.DEFAULT,
  disabled: false,
  isAutoWidth: false,
  isSubmitting: undefined,
  label: undefined,
  onClick: Utils.noop,
  size: Size.DEFAULT,
  type: Type.BUTTON,
};

Button.propTypes = {
  children: node,
  className: string,
  context: Context.propTypes,
  disabled: bool,
  isAutoWidth: bool,
  isSubmitting: bool,
  label: ({ label, text }) => {
    if (text || label) return undefined;

    return new Error('The `label` prop is required when no text is set');
  },
  onClick: func,
  size: Size.propTypes,
  text: ({ children, text }) => {
    if (children || text) return undefined;

    return new Error(
      `The 'text' prop is required when no children are provided`
    );
  },
  type: Type.propTypes,
};

export { Button, Context, Size, Type, styles };
