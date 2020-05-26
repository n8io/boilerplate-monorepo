import { SplitContext } from '@splitsoftware/splitio-react';
import debug from 'debug';
import { useContext, useState, useEffect } from 'react';

const log = debug('shared/useFeatureFlag');

const initial = {
  data: undefined,
  error: undefined,
  isLoading: true,
};

const useFeatureFlag = (flag, { delay, ...options } = {}) => {
  const { client, isReady, isTimedout: hasTimedOut } = useContext(SplitContext);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, beLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;

    const fetchFeatureFlag = async () => {
      log('Fetching feature flag...', flag, options);

      delay && (await new Promise((r) => setTimeout(r, delay)));

      const response = await client.getTreatment(flag, options);

      log('Feature flag value for current session', { [flag]: response });
      setData(response);
      beLoading(false);
    };

    beLoading(true);
    fetchFeatureFlag();
  }, [flag, isReady]);

  useEffect(() => {
    const err = hasTimedOut ? new Error('SplitIO connection timed out') : null;

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
