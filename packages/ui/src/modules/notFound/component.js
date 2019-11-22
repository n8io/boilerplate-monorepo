import { seconds } from '@puttingpoker/common';
import * as Sentry from '@sentry/browser';
import LogRocket from 'logrocket';
import { prop } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Body, Breadcrumb, Breadcrumbs, Content, Header } from 'shared/Content';
import { Page } from 'shared/Page';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { LogLevel } from 'types/logLevel';
import { Route } from 'types/route';

const SECONDS_TO_REDIRECT = 15;

const logNotFound = () => {
  Sentry.withScope(scope => {
    scope.setExtra('sessionUrl', LogRocket.sessionURL);
    scope.setExtra('pathname', prop('pathname', window.location));
    scope.setTag('search', prop('search', window.location));
    scope.setLevel(LogLevel.INFO);
    Sentry.captureException(
      new Error('User visited a resource that could not be found')
    );
  });
};

const NotFound = () => {
  const t = useTranslate({
    component: 'notFound',
    namespace: 'notFound',
  });
  const [tics, setTics] = useState(SECONDS_TO_REDIRECT);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    logNotFound();
  }, []);

  useEffect(() => {
    let interval = null;

    if (tics <= 1) return history.goBack();

    const ticToc = () => setTics(tics - 1);

    interval = setInterval(ticToc, seconds(1));

    return () => clearInterval(interval);
  }, [history, tics, setTics]);

  const { pathname } = location;

  const Italicize = styled.span`
    font-style: italic;
    margin-left: 0.25rem;
  `;

  return (
    <Page>
      <Content>
        <Breadcrumbs>
          <Breadcrumb isEnd text={t('title')} to={Route.NOT_FOUND.path} />
        </Breadcrumbs>
        <Header title={t('title')} />
        <Body>
          <p>
            {t('resourceNotFound')}:<Italicize>{pathname}</Italicize>
          </p>
          <p>{t('returning', { seconds: tics })}</p>
        </Body>
      </Content>
    </Page>
  );
};

export { NotFound };
