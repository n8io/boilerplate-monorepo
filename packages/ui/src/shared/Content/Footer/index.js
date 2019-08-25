import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { useTranslate } from '../../useTranslate';
import { bottomStyles as fadeBottomStyles } from '../fade';
import { GridTemplateArea } from '../gridTemplateArea';
import { Toggles } from './Toggles';

const domTestId = 'Footer';

const Styled = styled.footer`
  align-items: center;
  border-top: 1px solid ${Color.border};
  display: grid;
  grid-area: ${GridTemplateArea.FOOTER};
  grid-template-columns: auto 1fr auto;
  height: ${Layout.MAIN_FOOTER_HEIGHT}rem;
  padding: 0 1rem;

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

export { domTestId, Footer };
