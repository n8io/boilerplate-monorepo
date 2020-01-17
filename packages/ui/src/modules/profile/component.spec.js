import React from 'react';
import * as UseMutationHooks from 'shared/graphql/mutation/useUserSelfUpdate';
import * as UseQueryHooks from 'shared/graphql/query/useUserSelf';
import { render } from 'testHelpers';
import { Profile } from './component';

jest.mock('shared/Content');
jest.mock('shared/Page');

describe('<Profile/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Profile {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useUserSelfUpdate = td.replace(UseMutationHooks, 'useUserSelfUpdate');
    const useUserSelf = td.replace(UseQueryHooks, 'useUserSelf');

    td.when(
      useUserSelfUpdate({
        refetchQueries: [{ query: UseQueryHooks.QUERY_USER_SELF }],
      })
    ).thenReturn([
      jest.fn().mockName('userSelfUpdate'),
      { data: true, loading: false },
    ]);

    td.when(useUserSelf()).thenReturn({
      data: {
        email: 'EMAIL@EMAIL.EMAIL',
        id: 'ID',
        username: 'USERNAME',
      },
      loading: false,
    });
  });

  test('renders profile page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
