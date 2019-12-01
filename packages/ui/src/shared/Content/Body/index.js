import { bool, node, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';

const domId = 'content-body';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 0;
  overflow-y: auto;
  padding: ${CustomProperty.BASE_UNIT};
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
    id={domId}
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

export { Body, domId };
