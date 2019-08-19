import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Politeness, propTypes as politenessPropTypes } from 'types/politeness';

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
  <Styled aria-live={politeness}>{children}</Styled>
);

ScreenReaderNotification.defaultProps = {
  politeness: Politeness.POLITE,
};

ScreenReaderNotification.propTypes = {
  children: node.isRequired,
  politeness: politenessPropTypes,
};

export { ScreenReaderNotification };
