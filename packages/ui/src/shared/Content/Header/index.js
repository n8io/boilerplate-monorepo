import { string } from 'prop-types';
import React from 'react';
import { MoveFocusInside } from 'react-focus-lock';
import styled from 'styled-components/macro';
import { PageTitle } from '../../PageTitle';
import { topStyles as fadeTopStyles } from '../fade';
import { GridTemplateArea } from '../gridTemplateArea';

const domTestId = 'Header';
const domId = 'main-content';

const Styled = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  grid-area: ${GridTemplateArea.HEADER};
  height: var(--layout-main-header-height);
  padding: 0 var(--layout-base-unit);

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${fadeTopStyles}
`;

const H1 = styled.h1`
  margin-bottom: 0;
`;

const Header = ({ title }) => (
  <Styled data-testid={domTestId}>
    <PageTitle title={title} />
    <MoveFocusInside>
      <H1 id={domId} tabIndex="0">
        {title}
      </H1>
    </MoveFocusInside>
  </Styled>
);

Header.propTypes = {
  title: string.isRequired,
};

export { Header, domId, domTestId };
