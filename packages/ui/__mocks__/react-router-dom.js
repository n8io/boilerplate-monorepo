import React from 'react';

export * from 'react-router-dom';

const history = {
  push: jest.fn().mockName('history.push'),
};

const useHistory = () => history;

const useLocation = () => ({
  host: 'HOST',
  href: 'HREF',
  pathname: 'PATHNAME',
  port: 'PORT',
  protocol: 'PROTOCOL',
});

const Route = props => <x-Route {...props} />;
const Switch = props => <x-Switch {...props} />;

export { Route, Switch, useHistory, useLocation };
