import React from 'react';
import { Body, Content, Header, Breadcrumbs, Breadcrumb } from 'shared/Content';
import { Page } from 'shared/Page';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

const SignUp = () => {
  const t = useTranslate({
    component: 'signUp',
    namespace: 'signUp',
  });

  return (
    <Page>
      <Content>
        <Breadcrumbs>
          <Breadcrumb isEnd text={t('title')} to={Route.SIGN_UP.path} />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body></Body>
      </Content>
    </Page>
  );
};

export { SignUp };
