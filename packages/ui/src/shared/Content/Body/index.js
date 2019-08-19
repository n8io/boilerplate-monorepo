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

const Body = ({ className, children, hasBreadcrumbs }) => (
  <Styled
    className={className}
    data-testid={domTestId}
    hasBreadcrumbs={hasBreadcrumbs}
  >
    {children}
  </Styled>
);

Body.defaultProps = {
  className: undefined,
  hasBreadcrumbs: true,
};

Body.propTypes = {
  children: node.isRequired,
  className: string,
  hasBreadcrumbs: bool,
};

export { Body };
