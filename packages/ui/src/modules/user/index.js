import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "user" */
    './components'
  ).then(Utils.renameKeys({ User: 'default' }))
);

export { Lazy as User };
