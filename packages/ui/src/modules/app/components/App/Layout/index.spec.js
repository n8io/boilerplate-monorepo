import React from 'react';
import * as GreaterThanMobileBreakpoint from 'shared/Breakpoints/GreaterThanMobile';
import { render } from 'testHelpers';
import { Layout } from '.';

jest.mock('shared/useAuth');
jest.mock('./FavIcon', () => ({
  FavIcon: (props) => <x-FavIcon {...props} />,
}));
jest.mock('./Footer', () => ({
  Footer: (props) => <x-Footer {...props} />,
}));
jest.mock('./Header', () => ({
  Header: (props) => <x-Header {...props} />,
}));
jest.mock('./Main', () => ({
  Main: (props) => <x-Main {...props} />,
}));
jest.mock('./Meta', () => ({
  Meta: (props) => <x-Meta {...props} />,
}));
jest.mock('./Navigation', () => ({
  Navigation: (props) => <x-Navigation {...props} />,
}));

describe('<Layout/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Layout {...defaultProps} {...overrides} />);

  describe('when on mobile', () => {
    test('renders properly', () => {
      td.replace(GreaterThanMobileBreakpoint, 'GreaterThanMobile', () => null);

      const { container } = renderComponent();

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when on larger than mobile', () => {
    test('renders properly', () => {
      td.replace(GreaterThanMobileBreakpoint, 'GreaterThanMobile', (props) => (
        <x-GreaterThanMobile {...props} />
      ));

      const { container } = renderComponent();

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
