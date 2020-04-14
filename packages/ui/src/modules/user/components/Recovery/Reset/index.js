import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Body, Header } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';
import { Form } from './Form';

const Reset = () => {
  const t = useTranslate({
    component: 'user',
    namespace: 'user',
  });

  const history = useHistory();
  const { state } = useLocation();
  const { id, token } = state;

  useEffect(() => {
    if (id && token) return;

    history.push(Route.USER_ACCOUNT_RECOVERY.path);
  }, [id, token]);

  return (
    <>
      <Header title={t('passwordReset')} />
      <Body hasBreadcrumbs={false}>
        <Form id={id} token={token} />
      </Body>
    </>
  );
};

export { Reset };
