import * as Hooks from '@apollo/client';
import React from 'react';
import { Mutation } from 'shared/graphql/mutation';
import { Query } from 'shared/graphql/query';
import { render } from 'testHelpers';
import { Login } from './component';

jest.mock('shared/Content');
jest.mock('shared/Page');
jest.mock('shared/Button');
jest.mock('shared/useAuth');

describe('<Login/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Login {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useMutation = td.replace(Hooks, 'useMutation');

    td.when(
      useMutation(Mutation.LOGIN, {
        refetchQueries: [{ query: Query.ME }],
      })
    ).thenReturn([jest.fn().mockName('userLogin'), { loading: false }]);
  });

  test('renders login page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
