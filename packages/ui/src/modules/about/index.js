import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "about" */
    './components'
  ).then(Utils.renameKeys({ About: 'default' }))
);

export { Lazy as About };
