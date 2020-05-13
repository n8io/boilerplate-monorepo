import React from 'react';
import { render } from 'testHelpers';
import { App } from '.';
import * as UseAppReadyHook from './useAppReady';

jest.mock('./Layout', () => ({
  Layout: (props) => <x-Layout {...props} data-testid="layout" />,
}));

jest.mock('./Providers', () => ({
  Providers: (props) => <x-Providers {...props} data-testid="providers" />,
}));

describe('<App/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<App {...defaultProps} {...overrides} />);

  describe('when app is ready', () => {
    const isAppReady = true;

    beforeEach(() => {
      const useAppReady = td.replace(UseAppReadyHook, 'useAppReady');

      td.when(useAppReady()).thenReturn(isAppReady);
    });

    test('renders its children', () => {
      const { container, getByTestId } = renderComponent();

      expect(getByTestId('providers')).not.toBeNull();
      expect(getByTestId('providers')).not.toBeNull();
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when app is NOT ready', () => {
    const isAppReady = false;

    beforeEach(() => {
      const useAppReady = td.replace(UseAppReadyHook, 'useAppReady');

      td.when(useAppReady()).thenReturn(isAppReady);
    });

    test('does NOT renders its children', () => {
      const { queryByTestId } = renderComponent();

      expect(queryByTestId('providers')).toBeNull();
      expect(queryByTestId('providers')).toBeNull();
    });
  });
});
