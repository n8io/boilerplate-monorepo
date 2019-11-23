import { A11y } from '@boilerplate-monorepo/ui-common';
import { node } from 'prop-types';
import React from 'react';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { Fade } from 'types/fade';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Site } from 'types/site';
import { Toggles } from './Toggles';

const { Role } = A11y;

const Container = styled.footer`
  align-items: center;
  border-top: 1px solid var(--border-color);
  display: grid;
  grid-area: ${GridTemplateArea.FOOTER};
  grid-template-columns: auto 1fr auto;
  height: var(--layout-main-footer-height);
  padding: 0 var(--layout-base-unit);

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${Fade.bottom}
`;

const Footer = ({ children }) => {
  const t = useTranslate();

  return (
    <Container role={Role.FOOTER}>
      <EllipsiedText>
        {t('footer', { fullYear: new Date().getFullYear(), name: Site.name })}
      </EllipsiedText>
      <div>{children}</div>
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
