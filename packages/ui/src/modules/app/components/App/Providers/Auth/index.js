import jwtDecode from 'jwt-decode';
import { node } from 'prop-types';
import React, { useCallback, useState } from 'react';
import { AccessToken } from 'types/accessToken';
import { Provider } from 'types/provider';

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AccessToken.read());
  const [user, setUser] = useState(null);

  const logout = useCallback(() => {
    AccessToken.clear();
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
