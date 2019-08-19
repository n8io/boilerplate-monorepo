import React from 'react';
import { Body, Content, Footer, Header, Breadcrumbs } from 'shared/Content';
import { useTranslate } from 'shared/useTranslate';

const About = () => {
  const t = useTranslate({
    component: 'about',
    namespace: 'about',
  });

  return (
    <Content>
      <Breadcrumbs />
      <Header title={t('title')} />
      <Body>{t('body')}</Body>
      <Footer>{t('footer')}</Footer>
    </Content>
  );
};

export { About };
