import { User } from '@boilerplate-monorepo/common';
import React from 'react';
import * as GreaterThanMobileBreakpoint from 'shared/Breakpoints/GreaterThanMobile';
import * as MobileBreakpoint from 'shared/Breakpoints/Mobile';
import { render } from 'testHelpers';
import { Provider } from 'types/provider';
import { Header } from '.';

jest.mock('shared/useAuth');
jest.mock('./UserMenu', () => ({
  UserMenu: (props) => <x-UserMenu {...props} />,
}));
jest.mock('./SkipToContentLink', () => ({
  SkipToContentLink: (props) => <x-SkipToContentLink {...props} />,
}));

describe('<Header/>', () => {
  const defaultProps = {};

  const baseAuthContext = {
    login: jest.fn().mockName('login'),
    logout: jest.fn().mockName('logout'),
    user: User.uiExample({
      email: 'EMAIL',
    }),
  };

  const renderComponent = (authContext) => (overrides) => {
    // eslint-disable-next-line react/prop-types
    const wrapper = ({ children }) => (
      <Provider.AUTH value={authContext}>{children}</Provider.AUTH>
    );

    return render(<Header {...defaultProps} {...overrides} />, { wrapper });
  };

  describe('when authenticated', () => {
    const authContext = {
      ...baseAuthContext,
      isAuthenticated: true,
    };

    describe('when on mobile', () => {
      test('renders properly', () => {
        td.replace(
          GreaterThanMobileBreakpoint,
          'GreaterThanMobile',
          () => null
        );
        td.replace(MobileBreakpoint, 'Mobile', (props) => (
          <x-Mobile {...props} />
        ));

        const { container } = renderComponent(authContext)();

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('when on larger than mobile', () => {
      test('renders properly', () => {
        td.replace(
          GreaterThanMobileBreakpoint,
          'GreaterThanMobile',
          (props) => <x-GreaterThanMobile {...props} />
        );
        td.replace(MobileBreakpoint, 'Mobile', () => null);

        const { container } = renderComponent(authContext)();

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('when not authenticated', () => {
    const authContext = {
      ...baseAuthContext,
      isAuthenticated: false,
    };

    describe('when on mobile', () => {
      test('renders properly', () => {
        td.replace(
          GreaterThanMobileBreakpoint,
          'GreaterThanMobile',
          () => null
        );
        td.replace(MobileBreakpoint, 'Mobile', (props) => (
          <x-Mobile {...props} />
        ));

        const { container } = renderComponent(authContext)();

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('when on larger than mobile', () => {
      test('renders properly', () => {
        td.replace(
          GreaterThanMobileBreakpoint,
          'GreaterThanMobile',
          (props) => <x-GreaterThanMobile {...props} />
        );
        td.replace(MobileBreakpoint, 'Mobile', () => null);

        const { container } = renderComponent(authContext)();

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
