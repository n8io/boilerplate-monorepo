import React from 'react';
import { mainContentDomId } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { Color } from 'types/color';

const Styled = styled.a`
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute !important;
  width: 1px;

  &:focus {
    background-color: ${Color.white};
    border-radius: 0.25rem;
    clip: auto !important;
    color: ${Color.link};
    display: block;
    font-size: 1rem;
    height: auto;
    left: 0.5rem;
    line-height: normal;
    padding: 0.25rem 0.5rem;
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
