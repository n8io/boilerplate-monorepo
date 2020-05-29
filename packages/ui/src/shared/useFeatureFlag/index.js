import { SplitContext } from '@splitsoftware/splitio-react';
import debug from 'debug';
import { isNil, mergeRight, pick, unless } from 'ramda';
import { useContext, useEffect, useState } from 'react';
import { useAuth } from 'shared/useAuth';

const log = debug('shared/useFeatureFlag');

const initial = {
  data: undefined,
  error: undefined,
  isLoading: true,
};

const userToFeatureAttributes = unless(
  isNil,
  pick(['email', 'familyName', 'givenName', 'id', 'role', 'username'])
);

const useFeatureFlag = (flag, { delay, ...options } = {}) => {
  const { client, isReady, isTimedout: hasTimedOut } = useContext(SplitContext);
  const { isAuthenticated, user } = useAuth();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, beLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;

    const fetchFeatureFlag = async () => {
      const mergedOptions = mergeRight(
        { isAuthenticated },
        userToFeatureAttributes(user),
        options
      );

      log('Fetching feature flag...', flag, mergedOptions);

      delay && (await new Promise((r) => setTimeout(r, delay)));

      const response = await client.getTreatment(flag, mergedOptions);

      log('Feature flag value for current session', { [flag]: response });
      setData(response);
      beLoading(false);
    };

    beLoading(true);
    fetchFeatureFlag();
  }, [flag, isReady, user]);

  useEffect(() => {
    const err = hasTimedOut
      ? new Error('SplitIO connection timed out')
      : undefined;

    setError(err);
  }, [hasTimedOut]);

  if (!isReady) {
    return initial;
  }

  return {
    data,
    error,
    isLoading,
  };
};

export { useFeatureFlag };
