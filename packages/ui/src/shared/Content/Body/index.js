import { bool, node, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 0;
  overflow-y: auto;
  padding: var(--layout-base-unit);
`;

const Body = ({
  className,
  children,
  'data-testid': dataTestId,
  hasBreadcrumbs,
}) => (
  <Container
    className={className}
    data-testid={dataTestId}
    hasBreadcrumbs={hasBreadcrumbs}
    tabIndex={0}
  >
    {children}
  </Container>
);

Body.defaultProps = {
  className: undefined,
  hasBreadcrumbs: true,
};

Body.propTypes = {
  children: node.isRequired,
  className: string,
  'data-testid': string,
  hasBreadcrumbs: bool,
};

export { Body };
