import React from 'react';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { GridTemplateArea } from '../gridTemplateArea';

const domTestId = 'Header';
const domId = 'main-content';

const Styled = styled.div`
  align-items: center;
  box-shadow: 0 1px 0 0 ${Color.border};
  display: flex;
  font-size: 1.75rem;
  grid-area: ${GridTemplateArea.HEADER};
  height: ${Layout.MAIN_HEADER_HEIGHT}rem;
  padding: 0 1rem;
`;

const Header = ({ children, title }) => (
  <Styled data-testid={domTestId}>
    {children ? (
      children
    ) : (
      <h1 id={domId} tabIndex="-1">
        {title}
      </h1>
    )}
  </Styled>
);

const checkChildrenOrTitle = ({ children, title }) => {
  if (children || title) return;

  throw new Error('Either children or a title is required');
};

Header.propTypes = {
  children: checkChildrenOrTitle,
  title: checkChildrenOrTitle,
};

export { Header, domId, domTestId };
