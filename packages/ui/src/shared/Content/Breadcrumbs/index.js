import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Routes } from 'types/routes';
import { useTranslate } from '../../useTranslate';
import { GridTemplateArea } from '../gridTemplateArea';
import { Breadcrumb } from './Breadcrumb';

const domTestId = 'Breadcrumbs';

const Styled = styled.ul`
  align-items: center;
  box-shadow: 0 1px 0 0 var(--border-color);
  display: grid;
  grid-area: ${GridTemplateArea.BREADCRUMBS};
  grid-auto-flow: column;
  grid-gap: 0 calc(var(--layout-base-unit) * 0.5);
  justify-content: start;
  min-height: var(--layout-main-breadcrumb-height);
  padding: 0 var(--layout-base-unit);
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
