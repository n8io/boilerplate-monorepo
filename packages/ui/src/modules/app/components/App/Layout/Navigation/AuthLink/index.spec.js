import { User } from '@boilerplate-monorepo/common';
import React from 'react';
import { render } from 'testHelpers';
import { Provider } from 'types/provider';
import { AuthLink } from '.';

jest.mock('../NavLink', () => ({
  NavLink: props => <x-NavLink {...props} />,
}));

describe('<AuthLink/>', () => {
  const defaultProps = {
    onClick: jest.fn().mockName('onClick'),
  };

  const baseAuthContext = {
    login: jest.fn().mockName('login'),
    logout: jest.fn().mockName('logout'),
    user: User.uiExample({
      email: 'EMAIL',
    }),
  };

  const renderComponent = authContext => overrides => {
    // eslint-disable-next-line react/prop-types
    const wrapper = ({ children }) => (
      <Provider.AUTH value={authContext}>{children}</Provider.AUTH>
    );

    return render(<AuthLink {...defaultProps} {...overrides} />, { wrapper });
  };

  test('renders properly', () => {
    const authContext = {
      ...baseAuthContext,
      isAuthenticated: true,
    };

    const { container } = renderComponent(authContext)();

    expect(container).toMatchSnapshot();
  });
});
