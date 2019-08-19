import React from 'react';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { GridTemplateArea } from '../gridTemplateArea';
import { Breadcrumb } from './Breadcrumb';

const Styled = styled.ul`
  align-items: center;
  box-shadow: 0 1px 0 0 ${Color.border};
  display: grid;
  grid-area: ${GridTemplateArea.BREADCRUMBS};
  grid-auto-flow: column;
  grid-gap: 0 0.5rem;
  justify-content: start;
  min-height: ${Layout.MAIN_BREADCRUMB_HEIGHT}rem;
  padding: 0 1rem;
`;

const Breadcrumbs = () => {
  const t = useTranslate({
    component: 'common',
    namespace: 'common',
  });

  return (
    <Styled>
      <Breadcrumb>{t('home')}</Breadcrumb>
      <Breadcrumb>{t('dashboard')}</Breadcrumb>
    </Styled>
  );
};

export { Breadcrumbs };
