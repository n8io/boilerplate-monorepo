import React from 'react';
import { Header, Body, Footer, Content } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';

const Dashboard = () => {
  const t = useTranslate({
    component: 'dashboard',
    namespace: 'dashboard',
  });

  return (
    <Content>
      <Header title={t('title')} />
      <Body>{t('body')}</Body>
      <Footer>{t('footer')}</Footer>
    </Content>
  );
};

export { Dashboard };
