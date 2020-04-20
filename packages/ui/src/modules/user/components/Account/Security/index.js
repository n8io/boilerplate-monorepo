import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "userSecurity" */
    './component'
  ).then(Utils.renameKeys({ Security: 'default' }))
);

export { Lazy as Security };
