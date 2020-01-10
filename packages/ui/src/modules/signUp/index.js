import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "registration" */
    './component'
  ).then(Utils.renameKeys({ SignUp: 'default' }))
);

export { Lazy as SignUp };
