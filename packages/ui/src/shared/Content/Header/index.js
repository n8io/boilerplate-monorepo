import { SkipToDestination } from '@boilerplate-monorepo/ui-common';
import { node, string } from 'prop-types';
import React from 'react';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useModality } from 'shared/useModality';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { Fade } from 'types/fade';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { PageTitle } from '../../PageTitle';
import { SkipToNavLink } from './SkipToNavLink';

const Conainer = styled.div`
  align-items: center;
  border-bottom: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  display: grid;
  grid-auto-flow: column;
  grid-template-areas: '. . ${GridTemplateArea.NAV_MOBILE}';
  grid-template-columns: auto 1fr auto;
  height: ${CustomProperty.LAYOUT_MAIN_HEADER_HEIGHT};
  padding: 0 ${CustomProperty.BASE_UNIT};

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${Fade.top}
`;

const H1 = styled(EllipsiedText)`
  margin-bottom: 0;
`;

const Header = ({ children, title }) => {
  const { isEnabled: isModalityEnabled } = useModality();
  const autoFocus = isModalityEnabled && { 'data-autofocus': true };

  return (
    <Conainer>
      <PageTitle title={title} />
      {isModalityEnabled && <SkipToNavLink />}
      <H1 as="h1" id={SkipToDestination.MAIN} tabIndex={0} {...autoFocus}>
        {children || title}
      </H1>
      <div />
    </Conainer>
  );
};

Header.defaultProps = {
  children: undefined,
};

Header.propTypes = {
  children: node,
  title: string.isRequired,
};

export { Header };
