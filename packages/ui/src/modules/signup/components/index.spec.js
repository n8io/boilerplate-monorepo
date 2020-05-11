import React from 'react';
import * as MutationHooks from 'shared/graphql/mutation/useUserRegister';
import { render } from 'testHelpers';
import { Signup } from '.';

jest.mock('shared/Button');
jest.mock('shared/Content');
jest.mock('shared/Page');

jest.mock('./Form', () => ({
  Form: (props) => <x-Form {...props} />,
}));

describe('<Signup/>', () => {
  const defaultProps = {};

  const renderComponent = (overrides) =>
    render(<Signup {...defaultProps} {...overrides} />);

  beforeEach(() => {
    const useUserRegister = td.replace(MutationHooks, 'useUserRegister');

    td.when(useUserRegister()).thenReturn([
      jest.fn().mockName('userRegister'),
      { loading: false },
    ]);
  });

  test('renders signup page', () => {
    const { container } = renderComponent();

    expect(container.firstChild).toMatchSnapshot();
  });
});
