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

const Prompt = (props) => <x-Prompt data-testid="prompt" {...props} />;
const Route = (props) => <x-Route data-testid="route" {...props} />;
const Switch = (props) => <x-Switch data-testid="switch" {...props} />;

export { Prompt, Route, Switch, useHistory, useLocation };
