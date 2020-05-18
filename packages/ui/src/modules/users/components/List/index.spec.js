import { UserSnapshot } from '@boilerplate-monorepo/common';
import React from 'react';
import * as QueryHooks from 'shared/graphql/query/useUsers';
import { render } from 'testHelpers';
import { List } from '.';

jest.mock('shared/Content');

describe('<List/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<List {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useUsers = td.replace(QueryHooks, 'useUsers');
    const input = { after: null, first: 10 };
    const queryOptions = { variables: { input } };

    td.when(useUsers(queryOptions)).thenReturn({
      data: {
        users: {
          edges: [
            {
              cursor: 'CURSOR',
              node: UserSnapshot.apiExample(),
            },
          ],
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
            total: 0,
          },
        },
      },
      loading: false,
    });
  });

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
