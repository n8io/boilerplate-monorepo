import React from 'react';
import { render } from 'testHelpers';
import { Provider } from 'types/provider';
import { AuthButton } from '.';

describe('<AuthButton/>', () => {
  const defaultProps = {
    onClick: jest.fn().mockName('onClick'),
  };

  const baseAuthContext = {
    login: jest.fn().mockName('login'),
    logout: jest.fn().mockName('logout'),
    user: {
      email: 'EMAIL',
    },
  };

  const renderComponent = authContext => overrides => {
    // eslint-disable-next-line react/prop-types
    const wrapper = ({ children }) => (
      <Provider.AUTH value={authContext}>{children}</Provider.AUTH>
    );

    return render(<AuthButton {...defaultProps} {...overrides} />, { wrapper });
  };

  describe('when authenticated', () => {
    test('renders properly', () => {
      const authContext = {
        ...baseAuthContext,
        isAuthenticated: true,
      };

      const { container } = renderComponent(authContext)();

      expect(container).toMatchSnapshot();
    });
  });

  describe('when not authenticated', () => {
    test('renders properly', () => {
      const authContext = {
        ...baseAuthContext,
        isAuthenticated: false,
      };

      const { container } = renderComponent(authContext)();

      expect(container).toMatchSnapshot();
    });
  });
});
