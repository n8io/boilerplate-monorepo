import React from 'react';
import { Body, Content, Header, Breadcrumbs, Breadcrumb } from 'shared/Content';
import { Link } from 'shared/Link';
import { Page } from 'shared/Page';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

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
          &lt;login&gt; or <Link to={Route.SIGNUP.path}>{t('signup')}</Link>
        </Body>
      </Content>
    </Page>
  );
};

export { Login };
