import React from 'react';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { Color } from 'types/color';
import { Layout } from 'types/layout';
import { GridTemplateArea } from '../gridTemplateArea';
import { SkipNavLink } from './SkipNavLink';

const { HEADER } = GridTemplateArea;

const domTestId = 'Header';
const { border } = Color;
const { COMFORTABLE, COMPACT, DEFAULT } = Layout;

const layoutStyles = theme('layout', {
  [COMFORTABLE]: {
    height: '2.5rem',
  },
  [COMPACT]: {
    height: '2.25rem',
  },
  [DEFAULT]: {
    height: '2.75rem',
  },
});

const Styled = styled.header`
  align-items: center;
  border-bottom: 1px solid ${border};
  display: flex;
  font-size: 2rem;
  grid-area: ${HEADER};

  ${layoutStyles}
`;

const Header = () => {
  const t = useTranslate({
    component: 'app',
    namespace: 'app',
  });

  return (
    <Styled data-testid={domTestId} role="banner">
      <SkipNavLink />
      <h1>{t('name')}</h1>
    </Styled>
  );
};

export { domTestId, Header };
