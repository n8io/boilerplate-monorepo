import { A11y } from '@boilerplate-monorepo/ui-common';
import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const { Politeness } = A11y;

const Container = styled.div`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const ScreenReaderNotification = ({ children, politeness }) => (
  <Container aria-live={politeness}>{children}</Container>
);

ScreenReaderNotification.defaultProps = {
  politeness: Politeness.POLITE,
};

ScreenReaderNotification.propTypes = {
  children: node.isRequired,
  politeness: Politeness.propTypes.isRequired,
};

export { ScreenReaderNotification };
