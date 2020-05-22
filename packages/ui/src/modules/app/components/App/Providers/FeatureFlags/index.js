import { SplitFactory } from '@splitsoftware/splitio';
import { config } from 'config';
import debug from 'debug';
import { node } from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from 'shared/useAuth';
import { Provider } from 'types/provider';

const initial = {
  isReady: false,
  read: (featureFlag) =>
    // eslint-disable-next-line no-console
    console.error(
      '🔴 Attempted to read feature flag before the client was ready',
      featureFlag
    ),
  readAll: (featureFlags) =>
    // eslint-disable-next-line no-console
    console.error(
      '🔴 Attempted to read feature flags before the client was ready',
      featureFlags
    ),
  updateClient: () => null,
};

const log = debug('providers:FeatureFlags');

const DEFAULT_TRAFFIC_TYPE = 'web';

// eslint-disable-next-line max-statements
const FeatureFlags = ({ children }) => {
  const { SPLIT_IO_API_KEY: authorizationKey } = config;
  const [isReady, beReady] = useState(false);
  const [client, setClient] = useState(null);
  const { isAuthenticated, user } = useAuth();

  const isEnabled = Boolean(authorizationKey);
  const sessionKey = user && user.id;

  const destroyClient = async () => {
    if (!isEnabled) return;
    if (!client) return;

    log('Destroying existing SplitIO client...');
    await client.destroy();
    log('Existing SplitIO client destroyed');
  };

  const makeClient = useCallback(
    // eslint-disable-next-line max-statements
    async () => {
      if (client) {
        await destroyClient();
      }

      log('Making new SplitIO client...');
      // eslint-disable-next-line new-cap
      const newClient = SplitFactory({
        core: {
          authorizationKey,
          key: sessionKey,
          trafficType: DEFAULT_TRAFFIC_TYPE,
        },
      }).client();

      if (isReady) {
        log('New SplitIO client is ready');

        return newClient;
      }

      return new Promise((resolve) => {
        newClient.on(newClient.Event.SDK_READY, () => {
          log('New SplitIO client is ready');
          resolve(newClient);
        });
      });
    },
    [client, isReady, sessionKey]
  );

  useEffect(
    () => {
      log('FeatureFlags mounting...');

      if (!isEnabled) {
        log('FeatureFlags are not enabled, no-op');
        return () => null;
      }

      const loadNewClient = async () => {
        setClient(await makeClient());
        beReady(true);
      };

      loadNewClient();

      return () => {
        log('FeatureFlags unmounting...');

        client && destroyClient(client);
      };
    },
    [
      /* run on mount only */
    ]
  );

  const readAll = useCallback(
    (featureFlags) => {
      log('SplitIO reading flags', featureFlags);
      return [];
    },
    [client]
  );

  const read = (featureFlag) => readAll([featureFlag]);

  const updateSessionKey = useCallback(async () => {
    log('SplitIO updating session key', sessionKey);

    if (!isEnabled) {
      log('FeatureFlags are not enabled, no-op');

      return;
    }

    setClient(await makeClient());
  }, [makeClient]);

  useEffect(() => {
    log('isAuthenticated value changed', isAuthenticated);
    updateSessionKey();
  }, [isAuthenticated]);

  const context = {
    ...initial,
    isReady,
    read,
    readAll,
  };

  return (
    <Provider.FEATURE_FLAGS value={context}>{children}</Provider.FEATURE_FLAGS>
  );
};

FeatureFlags.propTypes = {
  children: node.isRequired,
};

export { FeatureFlags };
