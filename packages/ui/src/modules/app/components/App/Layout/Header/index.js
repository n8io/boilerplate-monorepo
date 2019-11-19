import React from 'react';
import { EllipsiedText } from 'shared/EllipsiedText';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { A11y } from 'types/a11y';
import { GridTemplateArea } from 'types/gridTemplateArea';

const { Role } = A11y;
const domTestId = 'Header';

const StyledHeader = styled.header`
  align-items: center;
  box-shadow: 0 1px 0 0 var(--border-color);
  display: flex;
  grid-area: ${GridTemplateArea.HEADER};
  grid-template-areas: auto 1fr auto;
  height: var(--layout-header-height);
  justify-content: space-between;
  padding: 0 var(--layout-base-unit);
`;

const Title = styled(EllipsiedText)`
  font-size: calc(var(--layout-base-unit) * 2);
  margin-bottom: 0;
`;

const Header = () => {
  const t = useTranslate({
    component: 'app',
    namespace: 'app',
  });

  return (
    <StyledHeader data-testid={domTestId} role={Role.BANNER}>
      <Title>{t('title')}</Title>
    </StyledHeader>
  );
};

export { domTestId, Header };
