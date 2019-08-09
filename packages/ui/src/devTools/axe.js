import React from 'react';
import ReactDOM from 'react-dom';

const load = () =>
  new Promise((resolve, reject) =>
    import(
      /* webpackChunkName: "reactAxe" */
      'react-axe'
    )
      .then(({ default: axe }) => {
        axe(React, ReactDOM, 1000);

        return resolve();
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error('Failed to lazy load react-axe', e);

        return reject();
      })
  );

export { load };
