import React from 'react';
import { Body, Breadcrumb, Breadcrumbs, Content, Header } from 'shared/Content';
import { Page } from 'shared/Page';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';
import { Form } from './Form';

const Profile = () => {
  const t = useTranslate({
    component: 'profile',
    namespace: 'profile',
  });

  return (
    <Page>
      <Content>
        <Breadcrumbs>
          <Breadcrumb isEnd text={t('title')} to={Route.USER_PROFILE.path} />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body>
          <Form />
        </Body>
      </Content>
    </Page>
  );
};

export { Profile };
