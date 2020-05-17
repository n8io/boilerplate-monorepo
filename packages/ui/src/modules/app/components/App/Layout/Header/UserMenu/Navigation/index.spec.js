import { UserRole, Permission } from '@boilerplate-monorepo/common';
import React from 'react';
import * as UseAuthHook from 'shared/useAuth';
import { render } from 'testHelpers';
import { Route } from 'types/route';
import { Navigation } from '.';

jest.mock('shared/Button');
jest.mock('shared/useAuth');

jest.mock('./NavLink', () => ({
  NavLink: (props) => <x-NavLink {...props} />,
}));

describe('<Navigation/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Navigation {...defaultProps} {...overrides} />);

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });

  const authRouteName = 'AUTH_ROUTE_NAME';
  const isAuthenticationRequired = true;
  const role = UserRole.USER;

  const navRoutes = [
    Route.example({ isAuthenticationRequired, name: authRouteName }),
  ];

  describe('when user is authenticated', () => {
    const isAuthenticated = true;

    let useAuth = null;

    beforeEach(() => {
      useAuth = td.replace(UseAuthHook, 'useAuth');

      td.when(useAuth()).thenReturn({ isAuthenticated, role });
      td.replace(Route, 'values', navRoutes);
    });

    test('renders the user account link', () => {
      const { getByTestId } = renderComponent();

      expect(getByTestId(Route.USER_ACCOUNT.name)).not.toBeNull();
    });

    describe('and the nav link requires permission', () => {
      const permissionRouteName = 'PERMISSION_ROUTE_NAME';

      const permissionRoutes = [
        Route.example({
          isAuthenticationRequired,
          name: permissionRouteName,
          requiredPermission: Permission.USERS_MANAGE,
        }),
      ];

      beforeEach(() => {
        td.replace(Route, 'values', permissionRoutes);
      });

      describe('and user has permission', () => {
        const adminRole = UserRole.ADMIN;

        beforeEach(() => {
          td.when(useAuth()).thenReturn({ isAuthenticated, role: adminRole });
        });

        test('renders the permission nav link', () => {
          const { getByTestId } = renderComponent();

          expect(getByTestId(permissionRouteName)).not.toBeNull();
        });
      });

      describe('and user DOES NOT have permission', () => {
        beforeEach(() => {
          td.when(useAuth()).thenReturn({ isAuthenticated, role });
        });

        test('does not renders the permission nav link', () => {
          const { queryByTestId } = renderComponent();

          expect(queryByTestId(permissionRouteName)).toBeNull();
        });
      });
    });

    describe('and the nav link DOES NOT require permission', () => {
      test('renders the authenticated nav link', () => {
        td.when(useAuth()).thenReturn({ isAuthenticated, role });

        const { getByTestId } = renderComponent();

        expect(getByTestId(authRouteName)).not.toBeNull();
      });
    });
  });

  describe('when user is NOT authenticated', () => {
    const isAuthenticated = false;

    let useAuth = null;

    beforeEach(() => {
      useAuth = td.replace(UseAuthHook, 'useAuth');

      td.when(useAuth()).thenReturn({ isAuthenticated, role: null });
      td.replace(Route, 'values', navRoutes);
    });

    test('DOES NOT render the user account link', () => {
      const { queryByTestId } = renderComponent();

      expect(queryByTestId(Route.USER_ACCOUNT.name)).toBeNull();
    });

    test('does not render the authenticated nav link', () => {
      td.when(useAuth()).thenReturn({ isAuthenticated, role });

      const { queryByTestId } = renderComponent();

      expect(queryByTestId(authRouteName)).toBeNull();
    });
  });
});
