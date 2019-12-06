import { node } from 'prop-types';
import React, { Suspense as NativeSuspense } from 'react';
import { Loader } from '../Loader';

const Suspense = ({ children }) => (
  <NativeSuspense fallback={<Loader />}>{children}</NativeSuspense>
);

Suspense.defaultProps = {
  children: undefined,
};

Suspense.propTypes = {
  children: node,
};

export { Suspense };
