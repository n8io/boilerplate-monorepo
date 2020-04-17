import React from 'react';

export * from 'react-router-dom';

const useHistory = () => ({
  push: jest.fn().mockName('history.push'),
});

const useLocation = () => ({
  host: 'HOST',
  href: 'HREF',
  pathname: 'PATHNAME',
  port: 'PORT',
  protocol: 'PROTOCOL',
  state: {
    user: {},
  },
});

const Route = props => <x-Route {...props} />;
const Switch = props => <x-Switch {...props} />;

export { Route, Switch, useHistory, useLocation };
