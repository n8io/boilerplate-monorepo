import { FetchPolicy } from '@boilerplate-monorepo/common';
import React from 'react';
import * as UseMutationHooks from 'shared/graphql/mutation/useUserSelfProfileUpdate';
import * as UseQueryHooks from 'shared/graphql/query/useUserSelf';
import { render } from 'testHelpers';
import { User } from '.';

jest.mock('shared/Content');
jest.mock('shared/Page');

jest.mock('./Routing', () => ({
  Routing: (props) => <x-Routing {...props} data-testid="routing" />,
}));

describe('<User/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<User {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useUserSelfProfileUpdate = td.replace(
      UseMutationHooks,
      'useUserSelfProfileUpdate'
    );

    const useUserSelf = td.replace(UseQueryHooks, 'useUserSelf');

    td.when(useUserSelfProfileUpdate()).thenReturn([
      jest.fn().mockName('userSelfUpdate'),
      { data: true, loading: false },
    ]);

    td.when(
      useUserSelf({
        fetchPolicy: FetchPolicy.CACHE_AND_NETWORK,
      })
    ).thenReturn({
      data: {
        email: 'EMAIL@EMAIL.EMAIL',
        id: 'ID',
        username: 'USERNAME',
      },
      loading: false,
    });
  });

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
