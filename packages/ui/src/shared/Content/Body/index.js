import { bool, node, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Layout } from 'types/layout';
import { GridTemplateArea } from '../gridTemplateArea';

const domTestId = 'Body';

const layoutHeight = hasBreadcrumbs => {
  const breadcrumbHeight = hasBreadcrumbs ? Layout.MAIN_BREADCRUMB_HEIGHT : 0;

  return (
    Layout.HEADER_HEIGHT +
    breadcrumbHeight +
    Layout.MAIN_HEADER_HEIGHT +
    Layout.MAIN_FOOTER_HEIGHT
  );
};

const Styled = styled.section`
  grid-area: ${GridTemplateArea.BODY};
  height: calc(
    100vh - ${({ hasBreadcrumbs }) => layoutHeight(hasBreadcrumbs)}rem
  );
  overflow-y: auto;
  padding: 1rem;
`;

const Body = ({
  className,
  children,
  'data-testid': dataTestId,
  hasBreadcrumbs,
}) => (
  <Styled
    className={className}
    data-testid={dataTestId}
    hasBreadcrumbs={hasBreadcrumbs}
    tabIndex={0}
  >
    {children}
  </Styled>
);

Body.defaultProps = {
  className: undefined,
  'data-testid': domTestId,
  hasBreadcrumbs: true,
};

Body.propTypes = {
  children: node.isRequired,
  className: string,
  'data-testid': string,
  hasBreadcrumbs: bool,
};

export { Body, domTestId };
