import * as Hooks from '@apollo/client';
import React from 'react';
import { Mutation } from 'shared/graphql/mutation';
import { Query } from 'shared/graphql/query';
import { render } from 'testHelpers';
import { Profile } from './component';

jest.mock('shared/Content');
jest.mock('shared/Page');

describe('<Profile/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Profile {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useMutation = td.replace(Hooks, 'useMutation');
    const useQuery = td.replace(Hooks, 'useQuery');

    td.when(
      useMutation(Mutation.USER_SELF_UPDATE, {
        refetchQueries: [{ query: Query.ME }],
      })
    ).thenReturn([
      jest.fn().mockName('userSelfUpdate'),
      { data: { userSelfUpdate: true }, loading: false },
    ]);
    td.when(useQuery(Query.ME)).thenReturn({
      data: {
        me: { email: 'EMAIL@EMAIL.EMAIL', id: 'ID', username: 'USERNAME' },
      },
      loading: false,
    });
  });

  test('renders profile page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
