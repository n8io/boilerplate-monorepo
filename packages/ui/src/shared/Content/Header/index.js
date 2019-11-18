import { node, string } from 'prop-types';
import React from 'react';
import { useModality } from 'shared/useModality';
import styled from 'styled-components/macro';
import { Fade } from 'types/fade';
import { PageTitle } from '../../PageTitle';

const domTestId = 'Header';
const domId = 'main-content';

const Styled = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  height: var(--layout-main-header-height);
  padding: 0 var(--layout-base-unit);

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${Fade.top}
`;

const H1 = styled.h1`
  align-items: center;
  display: grid;
  grid-auto-flow: column;
  margin-bottom: 0;
`;

const Header = ({ children, title }) => {
  const { isEnabled: isModalityEnabled } = useModality();
  const autoFocus = isModalityEnabled && { 'data-autofocus': true };

  return (
    <Styled data-testid={domTestId}>
      <PageTitle title={title} />
      <H1 id={domId} tabIndex={0} {...autoFocus}>
        {children || title}
      </H1>
    </Styled>
  );
};

Header.defaultProps = {
  children: undefined,
};

Header.propTypes = {
  children: node,
  title: string.isRequired,
};

export { Header, domId, domTestId };
