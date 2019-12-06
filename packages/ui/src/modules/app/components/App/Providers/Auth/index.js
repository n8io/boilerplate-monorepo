import { config } from 'config';
import { node } from 'prop-types';
import React, { useState, useCallback } from 'react';
import { Provider } from 'types/provider';

const { AVATAR_EMAIL } = config;

const Auth = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = useCallback(() =>
    setUser({
      email: AVATAR_EMAIL,
    })
  );

  const logout = useCallback(() => setUser(null));

  const authContext = {
    isAuthenticated: Boolean(user),
    login,
    logout,
    user,
  };

  return <Provider.AUTH value={authContext}>{children}</Provider.AUTH>;
};

Auth.propTypes = {
  children: node.isRequired,
};

export { Auth };
