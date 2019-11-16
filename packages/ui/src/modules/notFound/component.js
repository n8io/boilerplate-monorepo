import { seconds } from '@puttingpoker/common';
import * as Sentry from '@sentry/browser';
import LogRocket from 'logrocket';
import { func, shape } from 'prop-types';
import { prop } from 'ramda';
import React, { useEffect, useState } from 'react';
import { Body, Breadcrumb, Breadcrumbs, Content, Header } from 'shared/Content';
import { Page } from 'shared/Page';
import { useTranslate } from 'shared/useTranslate';
import { LogLevel } from 'types/logLevels';
import { Routes } from 'types/routes';

const domTestId = 'NotFound';

const logNotFound = () => {
  Sentry.withScope(scope => {
    scope.setExtra('sessionUrl', LogRocket.sessionURL);
    scope.setExtra('pathname', prop('pathname', window.location));
    scope.setTag('search', prop('search', window.location));
    scope.setLevel(LogLevel.INFO);
    Sentry.captureException(new Error('User visited an undefined resource'));
  });
};

const NotFound = ({ history }) => {
  const t = useTranslate({
    component: 'notFound',
    namespace: 'notFound',
  });

  const [tics, setTics] = useState(15);

  useEffect(() => {
    logNotFound();
  });

  useEffect(() => {
    let interval = null;

    if (tics <= 1) return history.goBack();

    const ticToc = () => setTics(tics - 1);

    interval = setInterval(ticToc, seconds(1));

    return () => clearInterval(interval);
  }, [history, tics, setTics]);

  return (
    <Page>
      <Content data-testid={domTestId}>
        <Breadcrumbs>
          <Breadcrumb isEnd text={t('title')} to={Routes.NOT_FOUND.path} />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body>
          <p>{t('body')}</p>
          <p>{t('returning', { seconds: tics })}</p>
        </Body>
      </Content>
    </Page>
  );
};

NotFound.propTypes = {
  history: shape({
    goBack: func.isRequired,
  }).isRequired,
};

export { NotFound, domTestId };

/*
import * as Sentry from '@sentry/browser';
import LogRocket from 'logrocket';
import { prop } from 'ramda';
import { compose, lifecycle, setDisplayName, withHandlers } from 'recompose';
import { INFO } from 'shared/logLevels';

const logNotFound = () => () => {
  Sentry.withScope(scope => {
    scope.setExtra('sessionUrl', LogRocket.sessionURL);
    scope.setTag('pathname', prop('pathname', window.location));
    scope.setTag('search', prop('search', window.location));
    scope.setLevel(INFO);
    Sentry.captureException('User visited an undefined resource');
  });
};

export const enhance = compose(
  setDisplayName('enhance'),
  withHandlers({
    logNotFound,
  }),
  lifecycle({
    componentDidMount() {
      const { logNotFound } = this.props;

      logNotFound();
    },
  })
);

 */
