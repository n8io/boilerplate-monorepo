import React from 'react';
import { Body, Breadcrumb, Breadcrumbs, Content, Header } from 'shared/Content';
import { Page } from 'shared/Page';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';
import { Form } from './Form';

const Login = () => {
  const t = useTranslate({
    component: 'login',
    namespace: 'login',
  });

  return (
    <Page>
      <Content>
        <Breadcrumbs>
          <Breadcrumb isEnd text={t('title')} to={Route.SIGNUP.path} />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body>
          <Form />
        </Body>
      </Content>
    </Page>
  );
};

export { Login };
