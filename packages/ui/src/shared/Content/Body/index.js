import { bool, node, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { GridTemplateArea } from '../gridTemplateArea';

const domTestId = 'Body';

const Styled = styled.section`
  grid-area: ${GridTemplateArea.BODY};
  height: calc(
    100vh -
      (
        ${({ hasBreadcrumbs }) =>
            hasBreadcrumbs ? 'var(--layout-main-breadcrumb-height)' : '0rem'} +
          var(--layout-header-height) + var(--layout-main-header-height) +
          var(--layout-main-footer-height)
      )
  );
  overflow-y: auto;
  padding: var(--layout-base-unit);
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
