import { config } from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'modules/app';

const { isProduction } = config;

if (isProduction) {
  ReactDOM.render(<App />, document.getElementById('root'));
} else {
  import(
    /* webpackChunkName: "devTools" */
    'devTools'
  ).then(async ({ load }) => {
    await load();
    ReactDOM.render(<App />, document.getElementById('root'));
  });
}
