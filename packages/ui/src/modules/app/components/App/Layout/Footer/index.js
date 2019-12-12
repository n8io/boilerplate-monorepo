import { A11y, Site } from '@boilerplate-monorepo/ui-common';
import { config } from 'config';
import { node } from 'prop-types';
import React from 'react';
import { EllipsiedText } from 'shared/EllipsiedText';
import { Muted } from 'shared/Muted';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { CustomProperty } from 'types/customProperties';
import { Fade } from 'types/fade';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Toggles } from './Toggles';

const { Role } = A11y;
const { RELEASE_VERSION, copyrightYear } = config;

const Container = styled.footer`
  align-items: center;
  border-top: 1px solid ${CustomProperty.CUSTOM_BORDER_COLOR};
  display: grid;
  grid-area: ${GridTemplateArea.FOOTER};
  grid-column-gap: calc(${CustomProperty.BASE_UNIT} * 0.25);
  grid-template-columns: auto 1fr auto auto;
  height: ${CustomProperty.LAYOUT_MAIN_FOOTER_HEIGHT};
  padding: 0 ${CustomProperty.BASE_UNIT};

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${Fade.bottom}
`;

const StyledMuted = styled(Muted)`
  font-size: calc(${CustomProperty.BASE_UNIT} * 0.95);
`;

const Footer = ({ children }) => {
  const t = useTranslate();

  return (
    <Container role={Role.FOOTER}>
      <EllipsiedText>
        {t('footer', { copyrightYear, name: Site.name })}
      </EllipsiedText>
      <div>{children}</div>
      <StyledMuted>v{RELEASE_VERSION}</StyledMuted>
      <Toggles />
    </Container>
  );
};

Footer.defaultProps = {
  children: undefined,
};

Footer.propTypes = {
  children: node,
};

export { Footer };
