import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "testPage" */
    './components'
  ).then(Utils.renameKeys({ TestPage: 'default' }))
);

export { Lazy as TestPage };
