import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Body, Header } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';
import { Form } from './Form';

const Notify = () => {
  const t = useTranslate({
    component: 'find',
    namespace: 'user',
  });

  const { state } = useLocation();
  const { user } = state;

  useEffect(() => {
    if (!user) {
      history.push(Route.USER_ACCOUNT_RECOVERY.path);
    }
  }, [user]);

  return (
    <>
      <Header title={t('recoverAccount')} />
      <Body hasBreadcrumbs={false}>
        <Form user={user} />
      </Body>
    </>
  );
};

export { Notify };
