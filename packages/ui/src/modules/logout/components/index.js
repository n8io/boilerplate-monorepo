import React from 'react';
import { useHistory } from 'react-router-dom';
import { Loader } from 'shared/Loader';
import { useAuth } from 'shared/useAuth';
import { useTimeout } from 'shared/useTimeout';
import { Route } from 'types/route';

const Logout = () => {
  const history = useHistory();
  const { logout } = useAuth();

  useTimeout(async () => {
    await logout();
    history.push(Route.LOGIN.path);
  }, 1);

  return <Loader />;
};

export { Logout };
