import React from 'react';
import { Body, Content, Footer, Header } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';

const NotFound = () => {
  const t = useTranslate({
    component: 'notFound',
    namespace: 'notFound',
  });

  return (
    <Content>
      <Header title={t('title')} />
      <Body>{t('body')}</Body>
      <Footer>{t('footer')}</Footer>
    </Content>
  );
};

export { NotFound };
