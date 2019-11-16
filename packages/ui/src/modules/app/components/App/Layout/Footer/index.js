import { node } from 'prop-types';
import React from 'react';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { A11y } from 'types/a11y';
import { Fade } from 'types/fade';
import { GridTemplateArea } from '../gridTemplateArea';
import { Toggles } from './Toggles';

const { Role } = A11y;
const domTestId = 'Footer';

const Styled = styled.footer`
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
    <Styled data-testid={domTestId} role={Role.FOOTER}>
      <span>{t('footer', { fullYear: new Date().getFullYear() })}</span>
      <div>{children}</div>
      <Toggles />
    </Styled>
  );
};

Footer.defaultProps = {
  children: undefined,
};

Footer.propTypes = {
  children: node,
};

export { Footer, domTestId };
