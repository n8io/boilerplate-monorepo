import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "notFound" */
    './components'
  ).then(Utils.renameKeys({ NotFound: 'default' }))
);

export { Lazy as NotFound };
