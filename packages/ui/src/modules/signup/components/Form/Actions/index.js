import React from 'react';
import { Link } from 'shared/Link';
import { SubmitButton } from 'shared/forms/SubmitButton';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components';
import { Route } from 'types/route';

const Container = styled.div`
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-auto-flow: column;
  grid-template-columns: auto 1fr auto;
  justify-content: start;
`;

const Actions = () => {
  const t = useTranslate({
    component: 'signup',
    namespace: 'signup',
  });

  return (
    <Container>
      <SubmitButton isAutoWidth text={t('signup')} />
      <div />
      <Link to={Route.LOGIN.path}>{t('login')}</Link>
    </Container>
  );
};

export { Actions };
