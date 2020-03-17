import React from 'react';
import { Body, Breadcrumb, Breadcrumbs, Content, Header } from 'shared/Content';
import { Link } from 'shared/Link';
import { Page } from 'shared/Page';
import { useAuth } from 'shared/useAuth';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';
import { Form } from './Form';

const Signup = () => {
  const t = useTranslate({
    component: 'signup',
    namespace: 'signup',
  });

  const { isAuthenticated } = useAuth();

  return (
    <Page>
      <Content>
        <Breadcrumbs>
          <Breadcrumb isEnd text={t('title')} to={Route.SIGNUP.path} />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body>
          <>
            {!isAuthenticated && <Form />}
            <br />
            or <Link to={Route.LOGIN.path}>{t('login')}</Link>
          </>
        </Body>
      </Content>
    </Page>
  );
};

export { Signup };
