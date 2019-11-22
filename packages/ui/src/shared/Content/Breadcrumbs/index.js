import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Route } from 'types/route';
import { useTranslate } from '../../useTranslate';
import { Breadcrumb } from './Breadcrumb';

const Styled = styled.ul`
  align-items: center;
  box-shadow: 0 1px 0 0 var(--border-color);
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 calc(var(--layout-base-unit) * 0.5);
  justify-content: start;
  min-height: var(--layout-main-breadcrumb-height);
  padding: 0 var(--layout-base-unit);
`;

const Breadcrumbs = ({ children }) => {
  const t = useTranslate();

  return (
    <Styled>
      <Breadcrumb
        exact={Route.ROOT.exact}
        text={t('home')}
        to={Route.ROOT.path}
      />
      {children}
    </Styled>
  );
};

Breadcrumbs.propTypes = {
  children: node.isRequired,
};

export { Breadcrumb, Breadcrumbs };
