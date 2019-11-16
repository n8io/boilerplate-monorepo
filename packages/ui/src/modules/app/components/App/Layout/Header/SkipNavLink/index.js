import React from 'react';
import { mainContentDomId } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';

const Styled = styled.a`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute !important;
  width: 1px;

  &:focus {
    background-color: var(--grayscale-white);
    border-radius: 0.25rem;
    clip: auto !important;
    display: block;
    font-size: 1rem;
    height: auto;
    left: 0.5rem;
    line-height: normal;
    padding: calc(var(--layout-base-unit) * 0.25)
      calc(var(--layout-base-unit) * 0.5);
    position: fixed;
    text-decoration: none;
    top: 0rem;
    width: auto;
    z-index: 100000;
  }
`;

const SkipNavLink = () => {
  const t = useTranslate({
    component: 'app',
    namespace: 'app',
  });

  return <Styled href={`#${mainContentDomId}`}>{t('skipLink')}</Styled>;
};

export { SkipNavLink };
