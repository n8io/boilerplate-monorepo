import React from 'react';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { A11y } from 'types/a11y';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Navigation } from './Navigation';

const { Role } = A11y;
const Container = styled.div`
  align-items: center;
  box-shadow: 0 1px 0 0 var(--border-color);
  display: grid;
  grid-area: ${GridTemplateArea.HEADER};
  grid-auto-flow: column;
  grid-template-areas: '. ${GridTemplateArea.NAV_MOBILE} .';
  grid-template-columns: 1fr auto 0;
  padding: 0 var(--layout-base-unit);
`;

const StyledHeader = styled(EllipsiedText)`
  align-items: center;
  font-size: calc(var(--layout-base-unit) * 2);
  height: var(--layout-header-height);
  justify-content: space-between;
  margin-bottom: 0;
  width: 100%;
`;

const Header = () => {
  const t = useTranslate({
    component: 'app',
    namespace: 'app',
  });

  return (
    <Container>
      <StyledHeader as="header" role={Role.BANNER} title={t('title')}>
        {t('title')}
      </StyledHeader>
      <Navigation />
    </Container>
  );
};

export { Header };
