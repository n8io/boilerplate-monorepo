import { useApolloClient } from '@apollo/client';
import { SplitClient } from '@splitsoftware/splitio-react';
import jwtDecode from 'jwt-decode';
import LogRocket from 'logrocket';
import { node } from 'prop-types';
import React, { useCallback, useState, useEffect } from 'react';
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

  useEffect(() => {
    if (!user) return;

    LogRocket.identify(user.id, user);
  }, [user]);

  const authContext = {
    isAuthenticated: Boolean(user),
    logout,
    role: user && user.role,
    updateAccessToken,
    user,
  };

  return (
    <Provider.AUTH value={authContext}>
      {user ? (
        <SplitClient splitKey={user.id}>{children}</SplitClient>
      ) : (
        children
      )}
    </Provider.AUTH>
  );
};

Auth.propTypes = {
  children: node.isRequired,
};

export { Auth };
