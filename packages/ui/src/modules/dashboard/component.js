import React from 'react';
import { Body, Content, Footer, Header, Breadcrumbs } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';

const Dashboard = () => {
  const t = useTranslate({
    component: 'dashboard',
    namespace: 'dashboard',
  });

  return (
    <Content>
      <Breadcrumbs />
      <Header title={t('title')} />
      <Body>
        <div
          dangerouslySetInnerHTML={{
            __html: t('body'),
          }}
        />
      </Body>
      <Footer>{t('footer')}</Footer>
    </Content>
  );
};

export { Dashboard };
