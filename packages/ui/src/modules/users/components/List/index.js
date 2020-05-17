import React from 'react';
import { Body, Breadcrumb, Breadcrumbs, Header } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const List = () => {
  const t = useTranslate({
    component: 'list',
    namespace: 'users',
  });

  return (
    <>
      <Breadcrumbs>
        <Breadcrumb isEnd text={t('users')} to={Route.USER_MANAGEMENT.path} />
      </Breadcrumbs>
      <Header title={t('users')} />
      <Body>
        <p>coming soon...</p>
      </Body>
    </>
  );
};

export { List };
