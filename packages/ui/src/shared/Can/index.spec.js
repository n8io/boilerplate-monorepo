import { Permission, UserRole } from '@boilerplate-monorepo/common';
import React from 'react';
import { render } from 'testHelpers';
import { Can } from '.';

describe('<Can/>', () => {
  const permission = Permission.USERS_MANAGE;
  const role = UserRole.ADMIN;

  const defaultProps = {
    permission,
    role,
  };

  const renderComponent = (overrides) =>
    render(<Can {...defaultProps} {...overrides} />);

  describe('when a role has a permission', () => {
    beforeEach(() => {
      const hasPermission = td.replace(Permission, 'hasPermission');

      td.when(hasPermission(role, permission)).thenReturn(true);
    });

    test('renders children', () => {
      const children = <x-child data-testid="child" />;
      const { getByTestId } = renderComponent({ children });

      expect(getByTestId('child')).not.toBeNull();
    });
  });

  describe('when a role DOES NOT have permission', () => {
    beforeEach(() => {
      const hasPermission = td.replace(Permission, 'hasPermission');

      td.when(hasPermission(role, permission)).thenReturn(false);
    });

    test('renders nothing', () => {
      const children = <x-child data-testid="child" />;
      const { queryByTestId } = renderComponent({ children });

      expect(queryByTestId('child')).toBeNull();
    });
  });
});
