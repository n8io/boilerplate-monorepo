import React from 'react';
import * as MutationHooks from 'shared/graphql/mutation/useUserRegister';
import { render } from 'testHelpers';
import { Notify } from '.';

jest.mock('shared/Button');
jest.mock('shared/Content');

jest.mock('./Form', () => ({
  Form: props => <x-Form {...props} />,
}));

describe('<Notify/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Notify {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useUserRegister = td.replace(MutationHooks, 'useUserRegister');

    td.when(useUserRegister()).thenReturn([
      jest.fn().mockName('userRegister'),
      { loading: false },
    ]);
  });

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });
});
