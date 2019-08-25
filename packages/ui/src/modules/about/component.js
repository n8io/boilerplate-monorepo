import React from 'react';
import {
  Body,
  Content,
  Footer,
  Header,
  Breadcrumbs,
  Breadcrumb,
} from 'shared/Content';
import { Page } from 'shared/Page';
import { useTranslate } from 'shared/useTranslate';
import { Routes } from 'types/routes';

const About = () => {
  const t = useTranslate({
    component: 'about',
    namespace: 'about',
  });

  return (
    <Page>
      <Content>
        <Breadcrumbs>
          <Breadcrumb
            exact={Routes.ABOUT.exact}
            isEnd
            text={t('title')}
            to={Routes.ABOUT.path}
          />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body>{t('body')}</Body>
        <Footer />
      </Content>
    </Page>
  );
};

export { About };
