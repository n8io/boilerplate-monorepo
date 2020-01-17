import React from 'react';
import { QUERY_USER_SELF } from 'shared/graphql';
import * as MutationHooks from 'shared/graphql/mutation/useUserLogin';
import { render } from 'testHelpers';
import { Login } from './component';

jest.mock('shared/Button');
jest.mock('shared/Content');
jest.mock('shared/Page');
jest.mock('shared/useAuth');

describe('<Login/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Login {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useUserLogin = td.replace(MutationHooks, 'useUserLogin');

    td.when(
      useUserLogin({
        refetchQueries: [{ query: QUERY_USER_SELF }],
      })
    ).thenReturn([jest.fn().mockName('userLogin'), { loading: false }]);
  });

  test('renders login page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
