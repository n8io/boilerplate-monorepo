import React from 'react';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { GridTemplateArea } from '../gridTemplateArea';
import { SkipNavLink } from './SkipNavLink';
import { Toggles } from './Toggles';

const domTestId = 'Header';

const Styled = styled.header`
  align-items: center;
  box-shadow: 0 1px 0 0 ${Color.border};
  display: flex;
  font-size: 2rem;
  grid-area: ${GridTemplateArea.HEADER};
  height: ${Layout.HEADER_HEIGHT}rem;
  justify-content: space-between;
  padding: 0 1rem;
`;

const Header = () => {
  const t = useTranslate({
    component: 'app',
    namespace: 'app',
  });

  return (
    <Styled data-testid={domTestId} role="banner">
      <SkipNavLink />
      <h1>{t('title')}</h1>
      <Toggles />
    </Styled>
  );
};

export { domTestId, Header };
