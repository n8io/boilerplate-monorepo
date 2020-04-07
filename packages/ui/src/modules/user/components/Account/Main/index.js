import React from 'react';
import { Body, Breadcrumb, Breadcrumbs, Header } from 'shared/Content';
import { Link } from 'shared/Link';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const Main = () => {
  const t = useTranslate({
    component: 'account',
    namespace: 'user',
  });

  return (
    <>
      <Breadcrumbs>
        <Breadcrumb isEnd text={t('account')} to={Route.USER_ACCOUNT.path} />
      </Breadcrumbs>
      <Header title={t('account')} />
      <Body>
        <p>
          <Link to={Route.USER_ACCOUNT_PROFILE.path}>{t('profile')}</Link>
        </p>
        <p>
          <Link to={Route.USER_ACCOUNT_SECURITY.path}>{t('security')}</Link>
        </p>
      </Body>
    </>
  );
};

export { Main };
