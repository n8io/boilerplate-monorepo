import { useApolloClient } from '@apollo/client';
import jwtDecode from 'jwt-decode';
import { node } from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useUserLogout } from 'shared/graphql';
import { AccessToken } from 'types/accessToken';
import { Provider } from 'types/provider';

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(AccessToken.read())
  );

  const client = useApolloClient();
  const [user, setUser] = useState(null);
  const [mutate] = useUserLogout();

  const logout = useCallback(async () => {
    await mutate();

    AccessToken.clear();
    client.resetStore();
    setIsAuthenticated(false);
    setUser(null);
  });

  const updateAccessToken = useCallback(
    token => {
      try {
        const payload = jwtDecode(token);

        AccessToken.set(token);
        setIsAuthenticated(true);
        setUser(payload);
      } catch {
        // Do nothing, bad token
      }
    },
    [setUser]
  );

  const authContext = {
    isAuthenticated,
    logout,
    role: user && user.role,
    updateAccessToken,
  };

  return <Provider.AUTH value={authContext}>{children}</Provider.AUTH>;
};

Auth.propTypes = {
  children: node.isRequired,
};

export { Auth };
