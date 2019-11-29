import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { Route } from 'types/route';
import { useTranslate } from '../../useTranslate';
import { Breadcrumb } from './Breadcrumb';

const Container = styled.ul`
  align-items: center;
  box-shadow: 0 1px 0 0 ${CustomProperty.CUSTOM_BORDER_COLOR};
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 calc(${CustomProperty.BASE_UNIT} * 0.5);
  justify-content: start;
  min-height: ${CustomProperty.LAYOUT_MAIN_BREADCRUMB_HEIGHT};
  padding: 0 ${CustomProperty.BASE_UNIT};
`;

const Breadcrumbs = ({ children }) => {
  const t = useTranslate();

  return (
    <Container>
      <Breadcrumb
        exact={Route.ROOT.exact}
        text={t('home')}
        to={Route.ROOT.path}
      />
      {children}
    </Container>
  );
};

Breadcrumbs.propTypes = {
  children: node.isRequired,
};

export { Breadcrumb, Breadcrumbs };
