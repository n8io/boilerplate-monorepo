import { seconds } from '@puttingpoker/common';
import { func, shape } from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Body,
  Content,
  Footer,
  Header,
  Breadcrumb,
  Breadcrumbs,
} from 'shared/Content';
import { Page } from 'shared/Page';
import { useTranslate } from 'shared/useTranslate';
import { Routes } from 'types/routes';

const NotFound = ({ history }) => {
  const t = useTranslate({
    component: 'notFound',
    namespace: 'notFound',
  });

  const [tics, setTics] = useState(15);

  useEffect(() => {
    let interval = null;

    if (tics <= 1) return history.goBack();

    const ticToc = () => setTics(tics - 1);

    interval = setInterval(ticToc, seconds(1));

    return () => clearInterval(interval);
  }, [history, tics, setTics]);

  return (
    <Page>
      <Content>
        <Breadcrumbs>
          <Breadcrumb isEnd text={t('title')} to={Routes.NOT_FOUND.path} />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body>
          <p>{t('body')}</p>
          <p>{t('returning', { seconds: tics })}</p>
        </Body>
        <Footer />
      </Content>
    </Page>
  );
};

NotFound.propTypes = {
  history: shape({
    goBack: func.isRequired,
  }).isRequired,
};

export { NotFound };
