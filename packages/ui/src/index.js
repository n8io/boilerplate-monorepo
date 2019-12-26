import { config } from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'modules/app';
import { initializeTranslations } from './i18n';

const { isProduction } = config;

initializeTranslations();

const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);

if (isProduction) {
  root.render(<App />);
} else {
  import(
    /* webpackChunkName: "devTools" */
    'devTools'
  ).then(async ({ load }) => {
    await load();
    root.render(<App />);
  });
}
