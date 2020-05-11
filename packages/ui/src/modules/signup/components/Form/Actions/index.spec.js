import React from 'react';
import { QUERY_USER_SELF } from 'shared/graphql';
import * as MutationHooks from 'shared/graphql/mutation/useUserLogin';
import { render } from 'testHelpers';
import { Actions } from '.';

jest.mock('shared/Link');
jest.mock('shared/forms/SubmitButton');

describe('<Actions/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Actions {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useUserLogin = td.replace(MutationHooks, 'useUserLogin');

    td.when(
      useUserLogin({
        refetchQueries: [{ query: QUERY_USER_SELF }],
      })
    ).thenReturn([jest.fn().mockName('userLogin'), { loading: false }]);
  });

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
