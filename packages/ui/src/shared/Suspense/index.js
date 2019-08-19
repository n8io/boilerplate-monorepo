import { node } from 'prop-types';
import React from 'react';
import { Loader } from '../Loader';

const Suspense = ({ children }) => (
  <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
);

Suspense.defaultProps = {
  children: undefined,
};

Suspense.propTypes = {
  children: node,
};

export { Suspense };
