import { config } from 'config';
import { useEffect, useState } from 'react';
import { AccessToken } from 'types/accessToken';

const useAppReady = () => {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    const uri = new URL(config.GRAPHQL_URI);

    uri.pathname = 'refresh_token';

    fetch(uri.href, {
      credentials: 'include',
      method: 'POST',
    })
      .then(async payload => {
        const data = await payload.json();
        const { ok, token } = data;

        ok && AccessToken.set(token);
      })
      .finally(() => setReady(true));
  }, []);

  return isReady;
};

export { useAppReady };
