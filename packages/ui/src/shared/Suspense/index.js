import { node } from 'prop-types';
import React from 'react';
import { Loading } from '../Loading';

const Suspense = ({ children }) => (
  <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
);

Suspense.defaultProps = {
  children: undefined,
};

Suspense.propTypes = {
  children: node,
};

export { Suspense };
