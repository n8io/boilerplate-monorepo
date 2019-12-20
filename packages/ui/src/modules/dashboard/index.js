import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "dashboard" */
    './component'
  ).then(Utils.renameKeys({ Dashboard: 'default' }))
);

export { Lazy as Dashboard };
