import { number } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { A11y } from 'types/a11y';
import { ScreenReaderNotification } from '../ScreenReaderNotification';
import { useTranslate } from '../useTranslate';
import { styles as themeStyles } from './theme';

const { Politeness } = A11y;

const domTestId = 'Loader';

const Styled = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Ring = styled.div`
  display: inline-block;
  height: ${({ size }) => size}px;
  position: relative;
  width: ${({ size }) => size}px;

  div {
    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border: ${({ size }) => size / 10}px solid var(--color-type-primary);
    border-color: var(--color-type-primary) transparent transparent transparent;
    border-radius: 50%;
    box-sizing: border-box;
    display: block;
    height: ${({ size }) => size}px;
    position: absolute;
    width: ${({ size }) => size}px;

    /* stylelint-disable-next-line order/properties-alphabetical-order */
    ${themeStyles}
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = ({ size }) => {
  const t = useTranslate({
    component: 'common',
    namespace: 'common',
  });

  return (
    <Styled data-testid={domTestId}>
      <Ring size={size}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Ring>
      <ScreenReaderNotification politeness={Politeness.POLITE}>
        {t('loadingScreenReader')}
      </ScreenReaderNotification>
    </Styled>
  );
};

Loader.defaultProps = {
  size: 24,
};

Loader.propTypes = {
  size: number,
};

export { domTestId, Loader };
