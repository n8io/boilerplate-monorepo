import React from 'react';
import * as MutationHooks from 'shared/graphql/mutation/useUserRegister';
import { render } from 'testHelpers';
import { Profile } from './component';

jest.mock('shared/Content');
jest.mock('shared/Page');
jest.mock('shared/useAuth');

jest.mock('./Form', () => ({
  Form: props => <x-Form {...props} />,
}));

describe('<Profile/>', () => {
  const defaultProps = {};

  const renderComponent = overrides =>
    render(<Profile {...defaultProps} {...overrides} />);

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
