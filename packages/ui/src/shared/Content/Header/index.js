import { node, string } from 'prop-types';
import React from 'react';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useModality } from 'shared/useModality';
import styled from 'styled-components/macro';
import { Fade } from 'types/fade';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Route } from 'types/route';
import { PageTitle } from '../../PageTitle';
import { Navigation } from './Navigation';

const domTestId = 'Header';
const domId = 'main-content';

const Styled = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  display: grid;
  grid-auto-flow: column;
  grid-template-areas: '. . ${GridTemplateArea.NAV_MOBILE}';
  grid-template-columns: auto 1fr auto;
  height: var(--layout-main-header-height);
  padding: 0 var(--layout-base-unit);

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${Fade.top}
`;

const H1 = styled(EllipsiedText)`
  margin-bottom: 0;
`;

const routes = Route.navigation(Route.values);

const Header = ({ children, title }) => {
  const { isEnabled: isModalityEnabled } = useModality();
  const autoFocus = isModalityEnabled && { 'data-autofocus': true };

  return (
    <Styled data-testid={domTestId}>
      <PageTitle title={title} />
      <H1 as="h1" id={domId} tabIndex={0} {...autoFocus}>
        {children || title}
      </H1>
      <div />
      <Navigation>{routes.map(route => route.name)}</Navigation>
    </Styled>
  );
};

Header.defaultProps = {
  children: undefined,
};

Header.propTypes = {
  children: node,
  title: string.isRequired,
};

export { Header, domId, domTestId };
