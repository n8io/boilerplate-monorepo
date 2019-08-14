import React from 'react';
import { Body, Content, Footer, Header } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';

const Home = () => {
  const t = useTranslate({
    component: 'home',
    namespace: 'home',
  });

  return (
    <Content>
      <Header title={t('title')} />
      <Body>{t('body')}</Body>
      <Footer>{t('footer')}</Footer>
    </Content>
  );
};

export { Home };
