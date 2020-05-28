import { User } from '@boilerplate-monorepo/common';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { Provider } from 'types/provider';
import { useAuth } from '.';

describe('useAuth', () => {
  test('should return the expected payload', () => {
    const user = User.uiExample();

    const authContext = {
      isAuthenticated: true,
      logout: jest.fn().mockName('logout'),
      role: user && user.role,
      updateAccessToken: jest.fn().mockName('updateAccessToken'),
      user,
    };

    // eslint-disable-next-line react/prop-types
    const wrapper = ({ children }) => (
      <Provider.AUTH value={authContext}>{children}</Provider.AUTH>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toEqual(authContext);
  });
});
