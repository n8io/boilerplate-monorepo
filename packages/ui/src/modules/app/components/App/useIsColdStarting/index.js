import { Time } from '@boilerplate-monorepo/common';
import { config } from 'config';
import { useEffect, useState } from 'react';
import { logFactory } from 'types/logFactory';

const debugLog = logFactory({
  method: 'checkHeartbeat',
  module: 'useIsColdStarting',
});

const checkHeartbeat = () =>
  new Promise((resolve, reject) => {
    const uri = new URL(config.GRAPHQL_URI);

    uri.pathname = 'heartbeat';

    fetch(uri.href)
      .then((response) => resolve(response.json()))
      .catch(reject);
  });

const useIsColdStarting = () => {
  const [isColdStarting, beColdStarting] = useState(true);

  useEffect(() => {
    const doImmediateCheck = async () => {
      try {
        // eslint-disable-next-line no-console
        debugLog('Checking heartbeat, currently cold starting...');

        const heartbeat = await checkHeartbeat();

        // eslint-disable-next-line no-console
        debugLog(heartbeat);

        beColdStarting(false);
      } catch {
        // Do nothing, wait for the interval to take over
      }
    };

    doImmediateCheck();

    const interval = setInterval(async () => {
      try {
        // eslint-disable-next-line no-console
        debugLog('Checking heartbeat, currently cold starting...');

        const heartbeat = await checkHeartbeat();

        // eslint-disable-next-line no-console
        debugLog(heartbeat);

        beColdStarting(false);
        clearInterval(interval);
      } catch {
        // Do nothing, keep checking
      }
    }, Time.seconds(5));

    return () => clearInterval(interval);
  }, []);

  return isColdStarting;
};

export { useIsColdStarting };
