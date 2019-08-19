import React from 'react';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { topStyles as fadeTopStyles } from '../fade';
import { GridTemplateArea } from '../gridTemplateArea';

const domTestId = 'Header';
const domId = 'main-content';

const Styled = styled.div`
  align-items: center;
  border-bottom: 1px solid ${Color.border};
  display: flex;
  grid-area: ${GridTemplateArea.HEADER};
  height: ${Layout.MAIN_HEADER_HEIGHT}rem;
  padding: 0 1rem;

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${fadeTopStyles}
`;

const H1 = styled.h1`
  margin-bottom: 0;
`;

const Header = ({ children, title }) => (
  <Styled data-testid={domTestId}>
    {children ? (
      children
    ) : (
      <H1 id={domId} tabIndex="-1">
        {title}
      </H1>
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
