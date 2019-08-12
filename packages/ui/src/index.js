import { config } from 'config';
import { initializeTranslations } from 'i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'modules/app';

const { isProduction } = config;

initializeTranslations();

if (isProduction) {
  ReactDOM.render(<App />, document.getElementById('root'));
} else {
  import(
    /* webpackChunkName: "devTools" */
    'modules/devTools'
  ).then(async ({ load }) => {
    await load();
    ReactDOM.render(<App />, document.getElementById('root'));
  });
}
