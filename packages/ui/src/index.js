import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'modules/app';
import { initializeTranslations } from './i18n';

initializeTranslations();

const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);
