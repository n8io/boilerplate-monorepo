import { useApolloClient } from '@apollo/client';
import jwtDecode from 'jwt-decode';
import { node } from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useUserLogout } from 'shared/graphql';
import { AccessToken } from 'types/accessToken';
import { Jwt } from 'types/jwt';
import { Provider } from 'types/provider';

const Auth = ({ children }) => {
  const client = useApolloClient();
  const [user, setUser] = useState(Jwt.decode(AccessToken.read()));
  const [mutate] = useUserLogout();

  const logout = useCallback(async () => {
    await mutate();

    AccessToken.clear();
    client.resetStore();
    setUser(null);
  });

  const updateAccessToken = useCallback(
    (token) => {
      try {
        const payload = jwtDecode(token);

        AccessToken.set(token);
        setUser(payload);
      } catch {
        // Do nothing, bad token
      }
    },
    [setUser]
  );

  const authContext = {
    isAuthenticated: Boolean(user),
    logout,
    role: user && user.role,
    updateAccessToken,
    user,
  };

  return <Provider.AUTH value={authContext}>{children}</Provider.AUTH>;
};

Auth.propTypes = {
  children: node.isRequired,
};

export { Auth };
