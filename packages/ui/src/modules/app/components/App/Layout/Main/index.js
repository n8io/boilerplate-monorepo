import { FeatureFlag } from '@boilerplate-monorepo/common';
import { A11y } from '@boilerplate-monorepo/ui-common';
import React, { useState, useEffect } from 'react';
import { ErrorNotification } from 'shared/ErrorNotification';
import { Feature } from 'shared/Feature';
import { InfoNotification } from 'shared/InfoNotification';
import { NotificationManager } from 'shared/NotificationContainer';
import { useIsInternetConnected } from 'shared/useIsInternetConnected';
import { useTranslate } from 'shared/useTranslate';
import styled from 'styled-components/macro';
import { GridTemplateArea } from 'types/gridTemplateArea';
import { Router } from '../../Router';

const { Role } = A11y;

const Container = styled.main`
  display: grid;
  grid-area: ${GridTemplateArea.MAIN};
  grid-template-rows: auto 1fr;
  height: 100%;
`;

const Main = () => {
  const isInternetConnected = useIsInternetConnected();
  const [lastIsConnected, setLastIsConnected] = useState(isInternetConnected);

  const t = useTranslate();

  const error = isInternetConnected ? null : new Error();

  useEffect(() => {
    if (lastIsConnected === isInternetConnected) return;

    setLastIsConnected(isInternetConnected);
  }, [isInternetConnected]);

  return (
    <Container role={Role.MAIN}>
      <NotificationManager />
      <Feature flag={FeatureFlag.WEB_BETA_USER}>
        <InfoNotification message={"You're a beta user 🎉"} />
      </Feature>
      <ErrorNotification error={error} messageKey="offlineDetected" />
      {lastIsConnected === false && isInternetConnected && (
        <InfoNotification message={t('onlineDetected')} />
      )}
      <Router />
    </Container>
  );
};

export { Main };
