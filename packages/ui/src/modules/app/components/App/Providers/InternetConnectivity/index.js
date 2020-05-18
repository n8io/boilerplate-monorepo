import { Time } from '@boilerplate-monorepo/common';
import isOnline from 'is-online';
import { node } from 'prop-types';
import React, { useState } from 'react';
import { useInterval } from 'shared/useInterval';
import { Provider } from 'types/provider';

const InternetConnectivity = ({ children }) => {
  const [isInternetConnected, setIsInternetConnected] = useState(true);

  useInterval(async () => {
    const checkInternetConnection = async () => {
      const isConnected = await isOnline();

      setIsInternetConnected(isConnected);
    };

    await checkInternetConnection();
  }, Time.seconds(15));

  return (
    <Provider.INTERNET_CONNECTIVITY value={isInternetConnected}>
      {children}
    </Provider.INTERNET_CONNECTIVITY>
  );
};

InternetConnectivity.propTypes = {
  children: node.isRequired,
};

export { InternetConnectivity };
