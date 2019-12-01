import { config } from 'config';
import { node } from 'prop-types';
import React, { useState, useCallback } from 'react';
import { useAuth } from 'shared/useAuth';

const { AVATAR_EMAIL } = config;

const Auth = ({ children }) => {
  const { provider: AuthProvider } = useAuth();
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

  return <AuthProvider value={authContext}>{children}</AuthProvider>;
};

Auth.propTypes = {
  children: node.isRequired,
};

export { Auth };
