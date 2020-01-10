import { config } from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'modules/app';
import { initializeTranslations } from './i18n';

const { isProduction } = config;

initializeTranslations();

const rootEl = document.getElementById('root');

if (isProduction) {
  ReactDOM.render(<App />, rootEl);
} else {
  import(
    /* webpackChunkName: "devTools" */
    'devTools'
  ).then(async ({ load }) => {
    await load();
    ReactDOM.render(<App />, rootEl);
  });
}
