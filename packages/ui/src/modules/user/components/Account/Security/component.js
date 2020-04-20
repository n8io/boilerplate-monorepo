import { always, equals } from 'ramda';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Body, Breadcrumb, Breadcrumbs, Header } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';
import { Form } from './Form';

const Security = () => {
  const t = useTranslate({
    component: 'user',
    namespace: 'user',
  });

  const location = useLocation();
  const isActive = equals(location.pathname, Route.USER_ACCOUNT.path);

  return (
    <>
      <Breadcrumbs>
        <Breadcrumb
          isActive={always(isActive)}
          text={t('account')}
          to={Route.USER_ACCOUNT.path}
        />
        <Breadcrumb
          isEnd
          text={t('security')}
          to={Route.USER_ACCOUNT_SECURITY.path}
        />
      </Breadcrumbs>
      <Header title={t('security')} />
      <Body>
        <Form />
      </Body>
    </>
  );
};

export { Security };
