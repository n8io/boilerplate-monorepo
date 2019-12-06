import { Theme, Modality } from '@boilerplate-monorepo/ui-common';
import { render } from '@testing-library/react';
import { node } from 'prop-types';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';
import { Provider } from 'types/provider';

export * from '@testing-library/react';

jest.mock('shared/useTheme');
jest.mock('shared/useTranslate');

const AllTheProviders = ({ children }) => (
  <Router>
    <Provider.MODALITY value={Modality.initial}>
      <ThemeProvider theme={Theme.example()}>{children}</ThemeProvider>
    </Provider.MODALITY>
  </Router>
);

AllTheProviders.propTypes = {
  children: node.isRequired,
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };
