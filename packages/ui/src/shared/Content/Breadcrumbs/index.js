import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { Routes } from 'types/routes';
import { useTranslate } from '../../useTranslate';
import { GridTemplateArea } from '../gridTemplateArea';
import { Breadcrumb } from './Breadcrumb';

const domTestId = 'Breadcrumbs';

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

const Breadcrumbs = ({ children }) => {
  const t = useTranslate();

  return (
    <Styled data-testid={domTestId}>
      <Breadcrumb
        exact={Routes.ROOT.exact}
        text={t('home')}
        to={Routes.ROOT.path}
      />
      {children}
    </Styled>
  );
};

Breadcrumbs.propTypes = {
  children: node.isRequired,
};

export { Breadcrumb, Breadcrumbs, domTestId };
