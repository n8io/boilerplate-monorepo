import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { useTranslate } from '../../useTranslate';
import { bottomStyles as fadeBottomStyles } from '../fade';
import { GridTemplateArea } from '../gridTemplateArea';
import { Toggles } from './Toggles';

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
  ${fadeBottomStyles}
`;

const Footer = ({ children }) => {
  const t = useTranslate();

  return (
    <Styled data-testid={domTestId}>
      <span>{t('footer')}</span>
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
