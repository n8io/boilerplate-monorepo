import React from 'react';
import { Body, Content, Header, Breadcrumbs, Breadcrumb } from 'shared/Content';
import { Page } from 'shared/Page';
import { useTranslate } from 'shared/useTranslate';
import { Route } from 'types/route';

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
        <Body>&nbsp;</Body>
      </Content>
    </Page>
  );
};

export { Profile };
