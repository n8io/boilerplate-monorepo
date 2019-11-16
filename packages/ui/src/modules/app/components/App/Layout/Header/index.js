import React from 'react';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { A11y } from 'types/a11y';
import { GridTemplateArea } from '../gridTemplateArea';
import { SkipNavLink } from './SkipNavLink';

const { Role } = A11y;
const domTestId = 'Header';

const Styled = styled.header`
  align-items: center;
  box-shadow: 0 1px 0 0 var(--border-color);
  display: flex;
  grid-area: ${GridTemplateArea.HEADER};
  height: var(--layout-header-height);
  justify-content: space-between;
  padding: 0 var(--layout-base-unit);
`;

const Title = styled.div`
  font-size: calc(var(--layout-base-unit) * 2);
  margin-bottom: 0;
`;

const Header = () => {
  const t = useTranslate({
    component: 'app',
    namespace: 'app',
  });

  return (
    <Styled data-testid={domTestId} role={Role.BANNER}>
      <SkipNavLink />
      <Title>{t('title')}</Title>
    </Styled>
  );
};

export { domTestId, Header };
