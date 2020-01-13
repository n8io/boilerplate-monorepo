import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "logout" */
    './component'
  ).then(Utils.renameKeys({ Logout: 'default' }))
);

export { Lazy as Logout };
