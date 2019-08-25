import { seconds } from '@puttingpoker/common';
import React from 'react';
import ReactDOM from 'react-dom';

const config = {
  rules: [
    {
      enabled: false,
      id: 'skip-link',
    },
    {
      enabled: false,
      id: 'color-contrast',
    },
  ],
};

const load = () =>
  new Promise((resolve, reject) =>
    import(
      /* webpackChunkName: "reactAxe" */
      'react-axe'
    )
      .then(({ default: axe }) => {
        axe(React, ReactDOM, seconds(5), config);

        return resolve();
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error('Failed to lazy load react-axe', e);

        return reject();
      })
  );

export { load };
