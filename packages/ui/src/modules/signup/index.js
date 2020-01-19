import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "signup" */
    './components'
  ).then(Utils.renameKeys({ Signup: 'default' }))
);

export { Lazy as Signup };
