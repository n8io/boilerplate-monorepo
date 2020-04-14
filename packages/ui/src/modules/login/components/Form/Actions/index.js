import { bool } from 'prop-types';
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

const Actions = ({ isAuthenticated }) => {
  const t = useTranslate({
    component: 'login',
    namespace: 'login',
  });

  const logInOutKey = isAuthenticated ? t('logout') : t('title');

  return (
    <Container>
      <SubmitButton isAutoWidth text={logInOutKey} />
      <Link to={Route.USER_ACCOUNT_RECOVERY.path}>{t('forgotPassword')}</Link>
      <Link to={Route.SIGNUP.path}>{t('signup')}</Link>
    </Container>
  );
};

Actions.propTypes = {
  isAuthenticated: bool.isRequired,
};

export { Actions };
