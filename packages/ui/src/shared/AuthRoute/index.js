import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'shared/useAuth';
import { Route as RouteType } from 'types/route';

const AuthRoute = props => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to={RouteType.DASHBOARD.path} />;
  }

  return <Route {...props} />;
};

export { AuthRoute };
