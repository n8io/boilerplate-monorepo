import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Layout } from 'types/layout';
import { Body } from './Body';
import { Footer } from './Footer';
import { Header } from './Header';
import { GridTemplateArea } from './gridTemplateArea';

const { BODY, FOOTER, HEADER } = GridTemplateArea;
const { COMFORTABLE, COMPACT, DEFAULT } = Layout;

const layoutStyles = theme('layout', {
  [COMFORTABLE]: {
    height: 'calc(100vh - 2.5rem)',
  },
  [COMPACT]: {
    height: 'calc(100vh - 2.25rem)',
  },
  [DEFAULT]: {
    height: 'calc(100vh - 2.75rem)',
  },
});

const Styled = styled.div`
  display: grid;
  grid-template-areas: '${HEADER}' '${BODY}' '${FOOTER}';
  grid-template-rows: auto 1fr auto;

  ${layoutStyles}
`;

const domId = 'main-content';

const Content = ({ children }) => (
  <Styled id={domId}>
    <Header />
    <Body>{children}</Body>
    <Footer />
  </Styled>
);

Content.propTypes = {
  children: node.isRequired,
};

export { domId, Content };
