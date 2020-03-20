import React from 'react';
import { QUERY_USER_SELF } from 'shared/graphql';
import * as MutationHooks from 'shared/graphql/mutation/useUserLogin';
import { render } from 'testHelpers';
import { Form } from '.';

jest.mock('shared/forms/Form');
jest.mock('shared/forms/Input');
jest.mock('shared/forms/useForm');
jest.mock('shared/Button');
jest.mock('shared/useAuth');

describe('<Form/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Form {...defaultProps} {...overrides} />);

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
