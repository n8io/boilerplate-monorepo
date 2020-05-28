import { FetchPolicy, User } from '@boilerplate-monorepo/common';
import React from 'react';
import * as MutationHooks from 'shared/graphql/mutation/useUserSelfProfileUpdate';
import * as QueryHooks from 'shared/graphql/query/useUserSelf';
import { render } from 'testHelpers';
import { Form } from '.';

jest.mock('shared/Button');
jest.mock('shared/ErrorNotification');
jest.mock('shared/SuccessNotification');
jest.mock('shared/forms/Form');
jest.mock('shared/forms/EmailInput');
jest.mock('shared/forms/SubmitButton');
jest.mock('shared/forms/TextInput');
jest.mock('shared/forms/useForm');
jest.mock('shared/Button');
jest.mock('shared/useAuth');

describe('<Form/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Form {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useUserSelf = td.replace(QueryHooks, 'useUserSelf');

    const useUserSelfProfileUpdate = td.replace(
      MutationHooks,
      'useUserSelfProfileUpdate'
    );

    td.when(
      useUserSelf({
        fetchPolicy: FetchPolicy.CACHE_AND_NETWORK,
      })
    ).thenReturn({
      data: User.apiExample(),
      loading: false,
    });

    td.when(useUserSelfProfileUpdate()).thenReturn([
      jest.fn().mockName('userSelfUpdate'),
      { loading: false },
    ]);
  });

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
