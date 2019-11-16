import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { A11y } from 'types/a11y';

const { Politeness } = A11y;
const domTestId = 'ScreenReaderNotification';

const Styled = styled.div`
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
  <Styled aria-live={politeness} data-testid={domTestId}>
    {children}
  </Styled>
);

ScreenReaderNotification.propTypes = {
  children: node.isRequired,
  politeness: Politeness.propTypes.isRequired,
};

export { ScreenReaderNotification, domTestId };
