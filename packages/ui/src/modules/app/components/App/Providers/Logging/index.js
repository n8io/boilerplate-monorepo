import { config } from 'config';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { useEffect } from 'react';

const { LOGROCKET_APP_ID, RELEASE, isTelemetryEnabled } = config;

const Logging = () => {
  useEffect(() => {
    if (!isTelemetryEnabled) return;

    LogRocket.init(LOGROCKET_APP_ID, {
      release: RELEASE,
    });

    setupLogRocketReact(LogRocket);
  }, []);

  return null;
};

export { Logging };
