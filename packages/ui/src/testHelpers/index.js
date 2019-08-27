import { cleanup, render } from '@testing-library/react';
import { curry } from 'ramda';
import React from 'react';
import { Providers } from 'modules/app';

export * from '@testing-library/react';

const customRender = curry((Component, defaultProps = {}, overrides = {}) =>
  render(<Component {...defaultProps} {...overrides} />, {
    wrapper: Providers,
  })
);

export { cleanup, customRender as render };
